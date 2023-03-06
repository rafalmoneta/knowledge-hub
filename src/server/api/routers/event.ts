import { markdownToHtml } from "@/lib/editor";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const eventRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        speakerId: z.string().optional(),
        startDate: z.date(),
        location: z.string().min(1),
        meeting: z.string().url().optional(),
        resources: z.string().url(),
        description: z.string().min(1),
        summary: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const speakerId = input.speakerId ?? ctx.session.user.id;

      const event = await ctx.prisma.event.create({
        data: {
          title: input.title,
          speaker: {
            connect: {
              id: speakerId,
            },
          },
          startDate: input.startDate,
          location: input.location,
          meeting: input.meeting,
          resources: input.resources,
          description: input.description,
          descriptionHtml: markdownToHtml(input.description),
          summary: input.summary,
          summaryHtml: markdownToHtml(input?.summary ? input.summary : ""),
        },
      });

      return event;
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const event = await ctx.prisma.event.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          speaker: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          startDate: true,
          location: true,
          meeting: true,
          resources: true,
          description: true,
          descriptionHtml: true,
          summary: true,
          summaryHtml: true,
        },
      });

      return event;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().min(1),
          // speakerId: z.string().optional(),
          startDate: z.date(),
          location: z.string().min(1),
          meeting: z.string().url().optional(),
          resources: z.string().url(),
          description: z.string().min(1),
          summary: z.string().optional(),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, data } = input;

      // TODO: Add missing validation for updating the event
      // const event = await ctx.prisma.event.findUnique({
      //   where: {
      //     id,
      //   },
      //   select: {
      //     speaker: {
      //       select: {
      //         id: true,
      //       },
      //     },
      //   },
      // });

      const updatedEvent = await ctx.prisma.event.update({
        where: {
          id,
        },
        data: {
          title: data.title,
          // speaker: {
          //   connect: {
          //     id: data.speakerId,
          //   },
          // },
          startDate: data.startDate,
          location: data.location,
          meeting: data.meeting,
          resources: data.resources,
          description: data.description,
          descriptionHtml: markdownToHtml(data.description),
          summary: data.summary,
          summaryHtml: markdownToHtml(data?.summary ? data.summary : ""),
        },
      });

      return updatedEvent;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const event = await ctx.prisma.event.findUnique({
        where: {
          id,
        },
        select: {
          speaker: {
            select: {
              id: true,
            },
          },
        },
      });

      const isUserAuthor = event?.speaker.id === ctx.session?.user?.id;
      const isUserAdmin = ctx.session?.user?.role === "ADMIN";

      if (!isUserAuthor && !isUserAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Forbidden to delete this post!",
        });
      }

      const deletedEvent = await ctx.prisma.event.delete({
        where: { id },
      });

      return deletedEvent;
    }),
  feed: protectedProcedure
    .input(
      z
        .object({
          take: z.number().min(1).max(50).optional(),
          skip: z.number().min(1).optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const take = input?.take ?? 20;
      const skip = input?.skip;

      const events = await ctx.prisma.event.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          speaker: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          startDate: true,
          location: true,
          meeting: true,
          resources: true,
          description: true,
          descriptionHtml: true,
          summary: true,
          summaryHtml: true,
        },
      });

      const eventsCount = await ctx.prisma.event.count();

      return {
        events,
        eventsCount,
      };
    }),
});
