import { cn } from "@/lib/utils";
import { CardWrapperProps } from "./types";

export const CardWrapper = ({ 
  children, 
  className,
  cols = 2 
}: CardWrapperProps) => {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  }[cols];

  return (
    <div className={cn(
      "grid gap-4",
      gridCols,
      className
    )}>
      {children}
    </div>
  );
};