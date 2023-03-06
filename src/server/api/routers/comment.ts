import { TRPCError } from "@trpc/server";
import { markdownToHtml } from "@/lib/editor";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const commentRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        postId: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { postId, content } = input;

      const comment = await ctx.prisma.comment.create({
        data: {
          content,
          contentHtml: markdownToHtml(content),
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          post: {
            connect: {
              id: postId,
            },
          },
        },
      });

      return comment;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const comment = await ctx.prisma.comment.findUnique({
        where: { id },
        select: {
          author: {
            select: {
              id: true,
            },
          },
        },
      });

      const userIsAuthor = comment?.author.id === ctx.session.user.id;

      if (!userIsAuthor) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the author of this comment",
        });
      }

      const deletedComment = await ctx.prisma.comment.delete({
        where: {
          id,
        },
      });

      return deletedComment;
    }),
  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          content: z.string().min(1),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, data } = input;

      const comment = await ctx.prisma.comment.findUnique({
        where: { id },
        select: {
          author: {
            select: {
              id: true,
            },
          },
        },
      });

      const userIsAuthor = comment?.author.id === ctx.session.user.id;

      if (!userIsAuthor) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not the author of this comment",
        });
      }

      const updatedComment = await ctx.prisma.comment.update({
        where: { id },
        data: {
          content: data.content,
          contentHtml: markdownToHtml(data.content),
        },
      });

      return updatedComment;
    }),
  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const comment = await ctx.prisma.comment.findUnique({
        where: { id },
        select: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          content: true,
          contentHtml: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return comment;
    }),
});
