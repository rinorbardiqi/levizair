import { z } from "zod";
import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
        name: z.string(),
        dob: z.date(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      if (!input.email || !input.password || !input.name)
        throw new Error("Missing input");

      const existingUser = await ctx.db.user.count({
        where: { email: input.email },
      });

      if (existingUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(input.password, 10);

      return ctx.db.user.create({
        data: {
          email: input.email,
          name: input.name,
          password: hashedPassword,
          dateOfBirth: input.dob,
          tags: "sports,anime",
          salutation: "MRS",
          gender: "M",
          passengerType: "ADULT",
        },
      });
    }),
});
