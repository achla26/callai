import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { MediaCardProps } from "./types";

export const MediaCard = ({
  title,
  description,
  image,
  alt,
  footer,
  className
}: MediaCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <div className="relative h-48">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};