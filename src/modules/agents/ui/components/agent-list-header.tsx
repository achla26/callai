"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AgentDialog } from "@/modules/agents/ui/components/agent-dialog";

interface AgentListHeaderProps {
    title: string;
    btnText: string;
}
export const AgentListHeader = ({ title, btnText }: AgentListHeaderProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
            </div>
        </>
    )
}

export default AgentListHeader; 