import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getMatchIds } from "~/server/helpers/getMatchIds";
import { z } from "zod";
import { getMatch } from "~/server/helpers/getMatch";

export const matchRouter = createTRPCRouter({
  get: protectedProcedure
    .input(z.object({
      count: z.number()
    }))
    .query(async ({ ctx, input }) => {
      const riotAccount = await ctx.prisma.riotAccount.findFirst({
        where: {
          user_id: ctx.session.user.id
        }
      });

      const ids: string[] = await getMatchIds(riotAccount?.puuid, input.count)
      ids.map(async (id) => {
        const match = await getMatch(id)
        
        const participant = match?.data?.info?.participants?.find((p) => p.puuid === riotAccount?.puuid)
        await ctx.prisma.match.create({
          data: {
            user_id: ctx.session.user.id,
            game_id: match?.data?.info?.gameId ?? 0,
            kills: participant?.kills ?? 0,
            deaths: participant?.deaths ?? 0,
            assists: participant?.assists ?? 0,
            firstBloodKill: participant?.firstBloodKill ?? false,
            firstTowerKill: participant?.firstTowerKill ?? false,
            championName: participant?.championName ?? "",
            goldEarned: participant?.goldEarnerd ?? 0,
            magicDamageDealtToChampions: participant?.magicDamageDealtToChampions ?? 0,
            physicalDamageDealtToChampions: participant?.physicalDamageDealtToChampinos ?? 0,
            visionScore: participant?.visionScore ?? 0,
            win: participant?.win ?? false,
            gameCreation: new Date(match.data.info.gameCreation)
          }
        })
      })
      return await ctx.prisma.match.findMany({
        where: {
          user_id: ctx.session.user.id
        },
        orderBy: {
          gameCreation: 'desc'
        }
      });
    }),
  getMostPlayedChamp: protectedProcedure.query(({ctx}) => {
    return ctx.prisma.match.groupBy({
      by: 'championName',
      _count: {
        championName: true
      },
      orderBy: {
        _count: {
          championName: 'desc'
        }
      },
      take: 1
    })
  }) 
});
