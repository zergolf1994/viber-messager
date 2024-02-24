import { ReactNode } from "react"

interface PublicLayoutProps {
    children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
    return (
        <>
            PublicLayout
            {children}
        </>
    )
}