"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
const AgentView = () => {
    const trpc = useTRPC();
    const { data, isLoading, isError } = useQuery(trpc.agents.getAll.queryOptions());

    return (
        <div>
            {isLoading ? (
                <LoadingState
                    title="Loading Agents"
                />
            ) : isError ? (
                <ErrorState
                    title="Error Loading Agents"
                    description="There was an error loading the agents. Please try again later."
                />
            ) : (
                <>
                    <div>{JSON.stringify(data, null, 4)} </div>
                    {data && data.map(agent => (
                        <div key={agent.id}>
                            {agent.name}
                        </div>
                    ))}
                </>
            )
            }
        </div>
    )
}

export default AgentView
