// app/providers.tsx
'use client'

import { ModalsProvider } from '@/hooks/use-modal';

export interface ProviderProps {
    children: React.ReactNode;
}

export function Providers({ children, ...props }: ProviderProps) {
    return (
        <ModalsProvider>
            {children}
        </ModalsProvider>
    )
}