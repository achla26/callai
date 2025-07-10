"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { AgentDialog } from "@/modules/agents/ui/components/agent-dialog";
import { useAgentFilters } from "../../hooks/use-agents-filter";
import { AgentSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";

interface AgentListHeaderProps {
    title: string;
    btnText: string;
}
export const AgentListHeader = ({ title, btnText }: AgentListHeaderProps) => {
    const [filters, setFilters] = useAgentFilters();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isAnyFilterModified = !!filters.search;

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE
        })
    }
    return (
        <>
            <AgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />

            <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">{title}</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon />
                        {btnText}
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 p-1">
                    <AgentSearchFilter />
                    {isAnyFilterModified && (
                        <Button variant="outline" size="sm" onClick={onClearFilters}>
                            <XCircleIcon />   Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}

export default AgentListHeader; 