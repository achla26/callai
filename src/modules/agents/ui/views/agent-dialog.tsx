import { ResponsiveDailog } from "@/components/responsive-dailog";
import { AgentForm } from "./agent-form";

interface AgentDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const AgentDialog = ({ open, onOpenChange }: AgentDialogProps) => {
    return (
        <ResponsiveDailog
            open={open}
            onOpenChange={onOpenChange}
            title="New Agent"
            description="Create a new agent to automate tasks and workflows."
        >
            <div className="p-4">

                <AgentForm
                    onSuccess={() => onOpenChange(false)}
                    onCancel={() => onOpenChange(false)} />
            </div>
        </ResponsiveDailog>
    );
};