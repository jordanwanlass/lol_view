import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getPuuid } from "~/server/helpers/getPuuid";

export const riotAccountRouter = createTRPCRouter({
  get: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.riotAccount.findUnique({
      where: { user_id: ctx.session.user.id },
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
      const puuid: string = await getPuuid(input.riotId, input.tagline);
      const riotAccount = await ctx.prisma.riotAccount.create({
        data: {
          user_id: ctx.session.user.id,
          riot_id: input.riotId,
          tagline: input.tagline,
          puuid: puuid
        }
      })
      return riotAccount;
    }),
    update: protectedProcedure
    .input(
      z.object({
        riotId: z.string().min(1),
        tagline: z.string().min(1).max(4),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const puuid: string = await getPuuid(input.riotId, input.tagline);
      const riotId = await ctx.prisma.riotAccount.update({
        where: {
          user_id: ctx.session.user.id
        },
        data: {
          riot_id: input.riotId,
          tagline: input.tagline,
          puuid: puuid
        }
      })

      return riotId;
    }),
});
