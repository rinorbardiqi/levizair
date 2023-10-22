import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { google } from "googleapis";
import language from "@google-cloud/language";
import { calculateLoyaltyPoints } from "./flights";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  },
});

const client = new language.LanguageServiceClient({
  auth,
});

const parseDateString = (dateString: string): Date => {
  const parsedDate = new Date(Date.parse(dateString));
  return parsedDate;
};

const getDuration = (startDate: Date, endDate: Date): string => {
  const durationInMilliseconds = endDate.getTime() - startDate.getTime();

  const millisecondsInMinute = 60 * 1000;
  let minutes = Math.floor(durationInMilliseconds / millisecondsInMinute);
  const hours = Math.floor(minutes / 60);
  minutes %= 60;

  if (hours > 0 && minutes > 0) {
    return `${hours}h ${minutes}min`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}min`;
  } else {
    return `${minutes}min`;
  }
};

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
      salience?: number | null;
      loialtyPoints: number;
      arriveDate?: Date;
      departureDate?: Date;
      price?: number;
      departureCity: string;
      arrivalCity: string;
      duration?: string;
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
            BookedSegment: true,
            startDestination: true,
          },
        });

        if (!response) return;
        const flightBookings = bookings.filter(
          (booking) => booking.tickets?.[0]?.arlineId === response.airlineId,
        ).length;
        bookingDealsBasedOnPrediction.push({
          salience: location.salience,
          loialtyPoints: calculateLoyaltyPoints(flightBookings, false),
          departureDate: response.BookedSegment[0]?.departureDate,
          arriveDate: response.BookedSegment[0]?.arrivalDate,
          price: response.BookedSegment[0]?.price,
          departureCity: response.startDestination.City,
          arrivalCity: response.destination.City,
          duration: getDuration(
            parseDateString(String(response.BookedSegment[0]?.departureDate)),
            parseDateString(String(response.BookedSegment[0]?.arrivalDate)),
          ),
        });
      }),
    );

    const bookingDeals = bookingDealsBasedOnPrediction.sort((a, b) => {
      return Number(b.salience) - Number(a.salience);
    });
    const predicted = {
      locationName: aiPredictedLocation?.[0]?.name ?? "",
      score: (Number(aiPredictedLocation?.[0]?.salience) * 100).toFixed(2),
      deals: bookingDeals.splice(0, 3),
    };

    return {
      predicted,
    };
  }),
});
