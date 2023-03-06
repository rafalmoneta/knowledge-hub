import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "./../trpc";

export const technologyRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const technology = await ctx.prisma.technology.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
        },
      });

      return technology;
    }),
  add: protectedProcedure
    .input(z.object({ name: z.string(), description: z.string() }))
    .query(async ({ input, ctx }) => {
      const { name, description } = input;

      const technology = await ctx.prisma.technology.create({
        data: {
          name,
          description,
        },
      });

      return technology;
    }),
  list: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const technologies = await ctx.prisma.technology.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return technologies;
  }),
});
