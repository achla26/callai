import { Loader2Icon } from "lucide-react";

interface Props {
    title: string;
    description?: string;
}

export const LoadingState = ({
    title,
    description = "This may take a few seconds...",
}: Props) => {
    return (
        <div className="px-8 py-4 flex  items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center gap-y-2 bg-background rounded-lg p-8 shadow-sm">
                <Loader2Icon className="animate-spin size-8 text-primary mb-4" />
                <h2 className="flex flex-col gap-y-2 text-center">{title}</h2>
                <p className="text-sm font-light">{description}</p>
            </div>
        </div>
    );
}