import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("w-11/12 mx-auto max-w-300", className)}>
      {children}
    </div>
  );
}
