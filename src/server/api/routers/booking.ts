import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookingRouter = createTRPCRouter({
  bookings: publicProcedure.query(async ({ ctx }) => {
    const bookings = await ctx.db.booking.findMany({
      where: {
        userUserId: { equals: ctx.session?.user.id },
        tickets: {
          some: {
            issuedDate: {
              lte: new Date(),
            },
          },
        },
      },
      include: {
        tickets: {
          include: {
            bookedSegments: {
              include: {
                flight: {
                  include: {
                    destination: true,
                    startDestination: true,
                  },
                },
              },
            },
            ticketingAirline: true,
          },
        },
      },
    });

    return {
      bookings,
    };
  }),
});
