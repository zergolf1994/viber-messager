import { ReactNode } from "react"

interface MessagerLayoutProps {
    children: ReactNode
}

export default function MessagerLayout({ children }: MessagerLayoutProps) {
    return <>{children}</>
}