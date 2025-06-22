import { cn } from "@/lib/utils";

// Type-safe prop definition
export interface GridWrapperProps {
    children: React.ReactNode;
    className?: string;
    cols?: 1 | 2 | 3 | 4; // Only allow 1 to 4 columns
}

// Map column count to Tailwind classes
const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
} as const;

// Component
export const GridWrapper = ({
    children,
    className,
    cols = 2, // default to 2 columns
}: GridWrapperProps) => {
    const gridCols = colsMap[cols] ?? colsMap[2];

    return (
        <div className={cn("grid gap-4", gridCols, className)}>
            {children}
        </div>
    );
};
