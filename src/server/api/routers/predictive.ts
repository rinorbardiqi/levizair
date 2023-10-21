import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { google } from "googleapis";
import language from "@google-cloud/language";

const auth = new google.auth.GoogleAuth({
  keyFile: `${process.cwd()}/levizair.json`,
});

const client = new language.LanguageServiceClient({
  auth,
});

async function predictAiLocation(aiQuery: string) {
  const request = {
    document: {
      content: aiQuery,
      type: "PLAIN_TEXT" as const,
    },
    features: {
      extractEntities: {
        types: ["LOCATION"],
      },
      analyzeText: aiQuery,
    },
  };

  try {
    return client.analyzeEntities(request).then((data) => {
      const entities = data[0].entities;
      const dataSet =
        entities?.filter((items) => items.type === "LOCATION") ?? [];

      return dataSet.sort((a, b) => {
        return Number(b.salience) - Number(a.salience);
      });
    });
  } catch (error) {
    console.error("Error occurred:", error);
    throw error;
  }
}

export const googleAiRouter = createTRPCRouter({
  predict: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    const bookings = await ctx.db.booking.findMany({
      where: {
        userUserId: { equals: userId },
      },
      include: {
        tickets: {
          include: {
            bookedSegments: {
              include: {
                flight: {
                  include: {
                    destination: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const location = bookings
      .flatMap((booking) => {
        return booking.tickets.map((ticket) => {
          return ticket.bookedSegments.map((segment) => {
            return segment.flight.destination.country;
          });
        });
      })
      .flat()
      .join(", ");

    const aiPredictedLocation = await predictAiLocation(location);

    const bookingDealsBasedOnPrediction: {
      id: number;
      destinationId: number;
      flightDate: Date;
      airlineId: number;
      startDestinationId: number;
    }[] = [];

    await Promise.all(
      aiPredictedLocation?.map(async (location) => {
        if (bookingDealsBasedOnPrediction.length >= 3) return;

        const response = await ctx.db.flights.findFirst({
          where: {
            destination: {
              country: location.name ?? "",
            },
          },
          include: {
            destination: true,
            Airline: true,
          },
        });

        if (!response) return;

        bookingDealsBasedOnPrediction.push(response);
      }),
    );

    const predicted = {
      locationName: aiPredictedLocation?.[0]?.name ?? "",
      score: (Number(aiPredictedLocation?.[0]?.salience) * 100).toFixed(2),
      deals: bookingDealsBasedOnPrediction,
    };

    return {
      predicted,
    };
  }),
});
