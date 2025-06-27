import { createTRPCRouter, baseProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
    getAll: baseProcedure.query(async () => {
        const data = await db.select().from(agents);

        // await new Promise((resolve) => setTimeout(resolve, 50000));

        throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to retrieve agents',
        })
        // if (!data || data.length === 0) {
        //     throw new TRPCError({
        //         code: 'NOT_FOUND',
        //         message: 'No agents found',
        //     });
        // }
        return data;
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
