import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "@/modules/agents/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
        try {
            const [existingAgent] = await db
                .select()
                .from(agents)
                .where(eq(agents.id, input.id));

            if (!existingAgent) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: `Āgent with ID ${input.id} not found`
                })
            }

            return existingAgent;
        } catch (err) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to retrieve agents',
            });
        }


    }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        try {
            const data = await db
                .select()
                .from(agents)
                .where(eq(agents.userId, ctx.auth.user.id));


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
