import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getTagDifference, newGraph, tagListDifference } from "~/libs/Tagging";

interface EventFitness {
  evnt: Event;
  fitness: number;
}

export const tagRouter = createTRPCRouter({
  personalizedEvents: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const eventsPromise = ctx.db.events.findMany({
        where: {
          date: {
            gt: new Date(),
          },
        },
        include: {
          Location: true,
        },
      });
      const userPromise = ctx.db.user.findFirst({
        where: {
          id: input.id,
        },
      });
      const [events, user] = await Promise.all([eventsPromise, userPromise]);

      const graph = newGraph();

      const x = events
        .map((evnt) => ({
          evnt: evnt,
          fitness: tagListDifference(
            graph,
            user?.tags.split(",") ?? [],
            evnt.tags.split(","),
          ),
        }))
        .sort((a, b) => b.fitness - a.fitness);

      return x.slice(0, 3);
    }),
});
