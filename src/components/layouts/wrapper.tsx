"use client"
import { ReactNode, useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface WrapperProps {
  children: ReactNode
  className?: string;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const { isOpen, toggle } = useSidebar();


  return (
    <main className={cn(
      "flex-1",
      "duration-500",
      isOpen ? "sm:pl-[75px] xl:pl-60" : "sm:pl-[75px]",
    )}>
      {children}
    </main>
  )
}
