import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure
} from "~/server/api/trpc";

// export const matchRouter = createTRPCRouter({
//   getAll: protectedProcedure.query(({ ctx }) => {
//     return ctx.prisma.match.findMany({
//       where: ctx.session.user?.id
//     });
//   });
// });