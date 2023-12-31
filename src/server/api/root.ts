import {
  bookingRouter,
  flightRouter,
  googleAiRouter,
  loyaltyPointsRouter,
  postRouter,
  tagRouter,
  userRouter,
} from "./routers/index";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  user: userRouter,
  googleAi: googleAiRouter,
  flight: flightRouter,
  loyaltyPoints: loyaltyPointsRouter,
  booking: bookingRouter,
  tags: tagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
