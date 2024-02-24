"use client"
import { ReactNode, useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
    children?: ReactNode
    className?: string;
}

export function Sidebar({ children, className }: SidebarProps) {
    const { isOpen } = useSidebar();
    return (
        <aside
            className={cn(
                //"flex",
                "self-start",
                "items-start",
                //"justify-between",
                "border-r",
                "bg-background",
                "text-dark-900",
                "fixed",
                "z-20",
                "duration-500",
                isOpen ? "sm:w-[75px] xl:w-60" : "sm:w-[75px]",
                "hidden sm:block",
                className
            )}
        >

            {children}
        </aside>
    );
}

export function SidebarToggle({ hidden }: { hidden?: boolean }) {

    const { isOpen, toggle } = useSidebar();

    const handleToggle = () => {
        toggle();
    };

    return (
        <>
            {
                hidden != isOpen &&
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggle}
                    className="h-9 w-9 rounded-md border"
                >
                    <ChevronLeftIcon
                        className={cn(
                            !isOpen && "rotate-180"
                        )}
                        size={30}
                    />
                </Button>
            }
        </>
    );
}

export function SidebarHeader({ children, className }: SidebarProps) {

    return (
        <div
            className={cn(
                "flex",
                "items-center",
                "justify-between",
                "h-16",
                "px-2",
                "border-b",
                "sticky",
                "top-0"
            )}
        >
            {children}
        </div>
    );
}
export function SidebarBody({ children, className }: SidebarProps) {

    return (
        <>
            <ScrollArea
                className={cn(
                    className
                )}
            >
                {children}
            </ScrollArea>
        </>
    );
}

export function SidebarFooter({ children, className }: SidebarProps) {

    return (
        <footer
            className={cn(
                "flex",
                "items-center",
                "justify-between",
                "h-56",
                "px-2",
                "border-b",
                "fixed"
            )}
        >
            {children}
        </footer>
    );
}


interface SideItemProps {
    asChild?: boolean;
    title: string;
    href?: string;
    icon?: React.ReactNode;
    LastSuffix?: React.ReactNode;
}

export const AsideItem = ({ title, icon, LastSuffix, href, ...rest }: SideItemProps) => {
    const { isOpen } = useSidebar();
    const pathname = usePathname()

    return (
        <li>
            <Link
                href={href as any}
                className={cn(
                    "flex",
                    "gap-1",
                    "px-4",
                    "py-3",
                    {
                        "bg-zinc-200 dark:bg-zinc-700": pathname === href,
                        "bg-background hover:bg-zinc-100 dark:hover:bg-zinc-600": pathname !== href,
                        "justify-center": !isOpen
                    }
                )}
            >
                {icon && <span>{icon}</span>}
                {isOpen && title && <span>{title}</span>}
            </Link>
        </li>
    );
}