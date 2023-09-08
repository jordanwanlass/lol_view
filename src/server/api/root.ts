import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { riotIdRouter } from "./routers/riotId";
// import { matchRouter } from "./routers/match";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  riotId: riotIdRouter,
  // match: matchRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
