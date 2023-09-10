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
      const match = await getMatch(ids[0])
      // ids.forEach((id) => {
      //   console.log(getMatch(id))
      // })
      return ids;
    }),
});
