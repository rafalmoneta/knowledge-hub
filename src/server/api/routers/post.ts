import { publicProcedure } from "./../trpc";
import { markdownToHtml } from "@/lib/editor";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  feed: protectedProcedure
    .input(
      z
        .object({
          take: z.number().min(1).max(50).optional(),
          skip: z.number().min(1).optional(),
          authorId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      const take = input?.take ?? 20;
      const skip = input?.skip;
      const where = { authorId: input?.authorId };

      const posts = await ctx.prisma.post.findMany({
        take,
        skip,
        orderBy: { createdAt: "desc" },
        where,
        select: {
          id: true,
          title: true,
          // content: true,
          contentHtml: true,
          createdAt: true,
          hidden: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          _count: {
            select: {
              comments: true,
            },
          },
        },
      });

      const postsCount = await ctx.prisma.post.count({
        where,
      });

      return {
        posts,
        postsCount,
      };
    }),
  add: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          contentHtml: markdownToHtml(input.content),
          author: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return post;
    }),
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const { id } = input;

      const post = await ctx.prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          content: true,
          contentHtml: true,
          createdAt: true,
          updatedAt: true,
          likedBy: {
            select: {
              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              content: true,
              contentHtml: true,
              createdAt: true,
              author: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      });

      // const userIsAuthor = post?.author.id === ctx.session?.user?.id;
      // const userIsAdmin = ctx.session?.user?.role === "ADMIN";

      // if (!post || (!userIsAuthor && !userIsAdmin)) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Post not found",
      //   });
      // }

      return post;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: z.object({
          title: z.string().min(1),
          content: z.string().min(1),
        }),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { id, data } = input;

      const post = await ctx.prisma.post.findUnique({
        where: { id },
        select: {
          author: {
            select: {
              id: true,
            },
          },
        },
      });

      const isUserAuthor = post?.author.id === ctx.session?.user?.id;

      if (!isUserAuthor) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Forbidden to edit this post!",
        });
      }

      const updatedPost = await ctx.prisma.post.update({
        where: { id },
        data: {
          title: data.title,
          content: data.content,
          contentHtml: markdownToHtml(data.content),
        },
      });

      return updatedPost;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const post = await ctx.prisma.post.findUnique({
        where: { id },
        select: {
          author: {
            select: {
              id: true,
            },
          },
        },
      });

      const isUserAuthor = post?.author.id === ctx.session?.user?.id;
      const isUserAdmin = ctx.session?.user?.role === "ADMIN";

      if (!isUserAuthor && !isUserAdmin) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Forbidden to delete this post!",
        });
      }

      const deletedPost = await ctx.prisma.post.delete({
        where: { id },
      });

      return deletedPost;
    }),
  like: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;

      const like = await ctx.prisma.postLike.create({
        data: {
          post: {
            connect: {
              id,
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });

      return like;
    }),
  unlike: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const unlike = await ctx.prisma.postLike.delete({
        where: {
          postId_userId: {
            postId: input.id,
            userId: ctx.session.user.id,
          },
        },
      });

      return unlike;
    }),
});
