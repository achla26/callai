import { AgentView, AgentsViewLoading, AgentsViewError } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { ErrorState } from '@/components/error-state';

const page = async () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getAll.queryOptions());

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense
                fallback={
                    <AgentsViewLoading />
                }>
                <ErrorBoundary
                    fallback={<AgentsViewError />}
                >
                    <AgentView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page
