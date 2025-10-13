import React from "react";
import { cn } from "@/lib/utils"; // ✅ make sure this import exists

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2 className={cn("text-3xl font-bold capitalize ", className)}>
      {children}
    </h2>
  );
};
