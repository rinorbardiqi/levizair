import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const loyaltyPointsRouter = createTRPCRouter({
  loyaltyPoints: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        take: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      return ctx.db.loyaltyPoints.findMany({
        where: {
          userId: input.userId,
        },
        take: input.take || 15,
        orderBy: {
          level: "desc",
        },
        include: {
          airline: true,
        },
      });
    }),
});
