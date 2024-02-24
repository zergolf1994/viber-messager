"use client"
import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react'

interface HeaderProps {
    children: ReactNode
    className?: string;
    sticky?: boolean
}

const Header = ({ children, className, sticky }: HeaderProps) => {
    return (
        <>
            <header className={cn(
                "sticky",
                "top-0",
                "z-30",
                "border-b",
                "bg-background/95",
                "backdrop-blur",
                "supports-backdrop-blur:bg-background/60",
            )}>
                <nav className={cn(
                    "flex",
                    "items-center",
                    "justify-between",
                    "h-16",
                    "px-4",
                )}>
                    {children}
                </nav>
            </header >
        </>
    )
}

export default Header