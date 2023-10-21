import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const BASELINE_POINTS = 15;

const frequentFlyerMultiplier = (numberOfFlights: number) => {
  if (numberOfFlights >= 2 && numberOfFlights < 4) {
    return 1.1;
  }
  if (numberOfFlights >= 5 && numberOfFlights < 10) {
    return 1.3;
  } else if (numberOfFlights >= 10) {
    return 1.5;
  }
  return 1;
};

const calculateLoyaltyPoints = (
  numberOfFlights: number,
  isSpecialDeal: boolean,
) => {
  let points = BASELINE_POINTS * frequentFlyerMultiplier(numberOfFlights);

  if (isSpecialDeal) {
    points += 20;
  }

  return points;
};

export const flightRouter = createTRPCRouter({
  flights: publicProcedure.query(async ({ ctx }) => {
    const flights = await ctx.db.flights.findMany({
      include: {
        Airline: true,
        destination: true,
      },
    });

    const bookings = await ctx.db.booking.findMany({
      where: {
        userUserId: { equals: ctx.session?.user.id },
      },
      include: {
        tickets: true,
      },
    });

    const loyaltyFlights = flights.map((flight) => {
      const flightBookings = bookings.filter(
        (booking) => booking.tickets?.[0]?.arlineId === flight.airlineId,
      ).length;

      return {
        ...flight,
        loyaltyPoints: calculateLoyaltyPoints(flightBookings, false),
      };
    });

    return {
      flights: loyaltyFlights,
    };
  }),
});
