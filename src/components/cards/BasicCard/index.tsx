import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BasicCardProps } from "./types";

export const BasicCard = ({ 
  title, 
  content,
  className,
  children // Add children prop
}: BasicCardProps & { children?: React.ReactNode }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
        {content && (
          <p className="text-sm text-muted-foreground">{content}</p>
        )}
      </CardHeader>
      <CardContent>
        {children} {/* Render children here */}
      </CardContent>
    </Card>
  );
};