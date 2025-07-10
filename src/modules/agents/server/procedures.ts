import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { TRPCError } from "@trpc/server";
import { agentInsertSchema } from "@/modules/agents/schema";
import { z } from "zod";
import { eq, getTableColumns, sql, and, ilike, desc, count } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";

export const agentsRouter = createTRPCRouter({

    getOne: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ input, ctx }) => {
        try {
            const [existingAgent] = await db
                .select({
                    //TODO change to actual count
                    meetingCount: sql<number>`5`,
                    ...getTableColumns(agents)
                })
                .from(agents)
                .where(
                    and(
                        eq(agents.id, input.id),
                        eq(agents.userId, ctx.auth.user.id),
                    )
                );
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
    getAll: protectedProcedure
        .input(
            z.object({
                page: z.number().default(DEFAULT_PAGE),
                pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
                search: z.string().nullish()
            })
        )
        .query(async ({ ctx, input }) => {
            const { search, page, pageSize } = input;
            try {
                const data = await db
                    .select({
                        //TODO change to actual count
                        meetingCount: sql<number>`5`,
                        ...getTableColumns(agents)
                    })
                    .from(agents)
                    .where(
                        and(
                            eq(agents.userId, ctx.auth.user.id),
                            search ? ilike(agents.name, `%${search}%`) : undefined,
                        )
                    )
                    .orderBy(desc(agents.createdAt), desc(agents.id))
                    .limit(pageSize)
                    .offset((page - 1) * pageSize);

                const [total] = await db
                    .select({ count: count() })
                    .from(agents)
                    .where(
                        and(
                            eq(agents.userId, ctx.auth.user.id),
                            search ? ilike(agents.name, `%${search}%`) : undefined,
                        )
                    );

                const totalPages = Math.ceil(total.count / pageSize);

                return {
                    items: data,
                    total: total.count,
                    totalPages
                };
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
