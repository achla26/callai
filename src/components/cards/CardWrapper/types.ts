import { ReactNode } from "react";

export interface CardWrapperProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}