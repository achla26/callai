import { AgentIdView, AgentIdViewError, AgentIdViewLoading } from '@/modules/agents/ui/views/agent-id-view';
import { trpc, getQueryClient } from '@/trpc/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

import { Suspense } from 'react';

interface Props {
    params: Promise<{ agentId: string }>
}

const page = async ({ params }: Props) => {
    const { agentId } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({ id: agentId })
    );

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense
                    fallback={
                        <AgentIdViewLoading />
                    }>

                    <ErrorBoundary
                        fallback={<AgentIdViewError />}
                    >
                        <AgentIdView agentId={agentId} />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </div>
    )
}

export default page
