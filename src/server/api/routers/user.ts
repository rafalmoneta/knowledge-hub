import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  profile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          image: true,
          title: true,
          email: true,
          skills: {
            select: {
              id: true,
              technology: {
                select: {
                  id: true,
                  name: true,
                },
              },
              expertise: true,
            },
          },
          position: true,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user;
    }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        position: z.string(),
        skills: z
          .object({
            technologyId: z.string(),
            expertise: z.number(),
          })
          .array(),
        skillsToBeDeleted: z.string().array().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { userId, position, skills, skillsToBeDeleted } = input;

      const user = await ctx.prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
        },
      });

      const isUserTheUser = user?.id === ctx.session?.user?.id;

      if (!isUserTheUser) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to update this user",
        });
      }

      const updatedUser = await ctx.prisma.user.update({
        where: { id: userId },
        data: {
          position,
          skills: {
            upsert: skills.map((skill) => ({
              where: {
                technologyId_userId: {
                  technologyId: skill.technologyId,
                  userId,
                },
              },
              update: { expertise: skill.expertise },
              create: {
                technologyId: skill.technologyId,
                expertise: skill.expertise,
              },
            })),
          },
        },
        select: {
          id: true,
        },
      });

      if (skillsToBeDeleted?.length) {
        await ctx.prisma.skill.deleteMany({
          where: {
            id: {
              in: skillsToBeDeleted,
            },
          },
        });
      }

      return updatedUser;
    }),

  getAll: protectedProcedure.input(z.object({})).query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        title: true,
        email: true,
        skills: {
          select: {
            id: true,
            technology: {
              select: {
                id: true,
                name: true,
              },
            },
            expertise: true,
          },
        },
        position: true,
      },
    });

    return users;
  }),
});
