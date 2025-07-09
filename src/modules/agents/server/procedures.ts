import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "@/modules/agents/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    // TODO: Change to use `protecedProcedure`

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async () => {
        try {
            const data = await db
                .select({
                    name: agents.name,
                })
                .from(agents)
                .where(eq(agents.id, input.id));

            return data;
        } catch (err) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to retrieve agents',
            });
        }


    }),
    getAll: protectedProcedure.query(async () => {
        try {
            const data = await db.select().from(agents);

            // await new Promise((resolve) => setTimeout(resolve, 50000));

            // throw new TRPCError({
            //     code: 'INTERNAL_SERVER_ERROR',
            //     message: 'Failed to retrieve agents',
            // })
            // if (!data || data.length === 0) {
            //     throw new TRPCError({
            //         code: 'NOT_FOUND',
            //         message: 'No agents found',
            //     });
            // }
            return data;
        } catch (err) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to retrieve agents',
            });
        }


    }),

    create: protectedProcedure
        .input(agentInsertSchema)
        .mutation(async ({ input, ctx }) => {
            const [createdAgent] = await db.insert(agents).values({
                ...input,
                userId: ctx.auth.user.id,
            }).returning();

            return createdAgent;
        }),

    // getById: baseProcedure.input((val: { id: string }) => val).query(async ({ input }) => {
    //     return await db.select().from(agents).where(agents.id.eq(input.id)).limit(1);
    // }),

    // create: baseProcedure
    //     .input((val: { name: string; userId: string; description?: string }) => val)
    //     .mutation(async ({ input }) => {
    //     const newAgent = {
    //         name: input.name,
    //         userId: input.userId,
    //         description: input.description,
    //     };
    //     return await db.insert(agents).values(newAgent).returning();
    //     }),    
});
