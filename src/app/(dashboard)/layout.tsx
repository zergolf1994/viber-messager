import { ReactNode } from "react"

import Header from "@/components/layouts/header"
import { AsideItem, Sidebar, SidebarBody, SidebarFooter, SidebarHeader, SidebarToggle } from "@/components/layouts/sidebar"
import { ModeToggle, ThemeToggle } from "@/components/theme-provider"
import { LogoNextJs } from "@/components/logo"
import { Wrapper } from "@/components/layouts/wrapper"
import { LayoutDashboardIcon } from "lucide-react"

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen w-full flex-col bg-light-300 dark:bg-dark-100">
            <Header sticky>
                <div className="flex gap-2 items-center">
                    <LogoNextJs />
                    <SidebarToggle />
                    <ThemeToggle />
                </div>
            </Header>
            <div className="flex flex-1 flex-col">
                <Sidebar>
                    <SidebarBody
                        className="h-[calc(100dvh_-_4rem)]"
                    >
                        <ul>
                            <AsideItem
                                title="Dashboard"
                                href="/home"
                                icon={<LayoutDashboardIcon size={20} />}
                            />
                            <AsideItem
                                title="Home 1"
                                href="/home-1"
                                icon={<LayoutDashboardIcon size={20} />}
                            />
                            <AsideItem
                                title="Home 2"
                                href="/home-2"
                                icon={<LayoutDashboardIcon size={20} />}
                            />
                            <AsideItem
                                title="Home 3"
                                href="/home-3"
                                icon={<LayoutDashboardIcon size={20} />}
                            />
                        </ul>
                        {/*Array.from({ length: 50 }).map((v, i) =>
                            <p key={i}>menu {i}</p>
    )*/}
                    </SidebarBody>
                </Sidebar>
                <Wrapper>
                    {children}
                </Wrapper>
            </div>
        </div>
    )
}