import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";
import { eventRouter } from "./routers/event";
import { userRouter } from "./routers/user";
import { technologyRouter } from "./routers/technology";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  comment: commentRouter,
  event: eventRouter,
  user: userRouter,
  technologies: technologyRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
