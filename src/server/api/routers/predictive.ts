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

      return dataSet.reduce((prev, current) => {
        return prev?.salience ?? 0 > Number(current?.salience) ? prev : current;
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

    const predicted = {
      location: aiPredictedLocation.name,
      score: (Number(aiPredictedLocation?.salience) * 100).toFixed(2),
    };

    return {
      predicted,
    };
  }),
});
