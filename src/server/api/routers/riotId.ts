import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const riotIdRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.riotId.findUnique({
      where: { userId: ctx.session.user.id },
    });
  }),
  set: protectedProcedure
    .input(
      z.object({
        riotId: z.string().min(1),
        tagline: z.string().min(1).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {

      const riotId = await ctx.prisma.riotId.create({
        data: {
          userId: ctx.session.user.id,
          riot_id: input.riotId,
          tagline: input.tagline,
        }
      })

      return riotId;
    }),
});
