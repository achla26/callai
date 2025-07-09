import Image from "next/image";

interface Props {
    title: string;
    description?: string;
}

export const EmptyState = ({
    title,
    description = "This may take a few seconds...",
}: Props) => {
    return (
        <div className="px-8 py-4 flex  items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center gap-y-2 bg-background rounded-lg p-8 shadow-sm">
                <Image src="/empty.svg" alt="empty" width={240} height={240} />
                <div className="flex flex-col gap-y-6 max-w-wd mx-auto text-center">
                    <h6 className="flex flex-col gap-y-2 text-center">{title}</h6>
                    <p className="text-sm">{description}</p>
                </div>
            </div>
        </div>
    );
}