"use client"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentFilters } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/data-pagination";

export const AgentView = () => {
    const [filters, setFilters] = useAgentFilters();
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.agents.getAll.queryOptions({
        ...filters
    }));

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable columns={columns} data={data.items} />
            <DataPagination
                page={filters.page}
                totalPages={data.totalPages}
                onPageChnage={(page) => setFilters({ page })}
            />
            {data.items.length === 0 && (
                <EmptyState
                    title="Create Tour First Agent"
                    description="Create an agent to join your meetings.Each agent will follow your instructions and can interact with partcipants during the call."
                />
            )}
        </div>
    )
}

export const AgentsViewLoading = () => {
    return (
        <LoadingState
            title="Loading Agents"
        />
    )
}

export const AgentsViewError = () => {
    return (
        <ErrorState
            title="Error Loading Agents"
            description="There was an error loading the agents. Please try again later."
        />
    )
}