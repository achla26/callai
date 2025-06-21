import { ReactNode } from "react";

export interface MediaCardProps {
  title: string;
  description: string;
  image: string;
  alt: string;
  footer?: ReactNode;
  className?: string;
}