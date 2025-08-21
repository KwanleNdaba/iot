import AppLayout from '@/components/AppLayout'
import { SidebarProvider } from '@/components/ui/sidebar';
import React, { ReactNode } from 'react'
interface AppLayoutProps {
    children: ReactNode;
}
function layout({ children }: AppLayoutProps) {
    return (
        <div>
            <SidebarProvider>
                <AppLayout children={children} />
            </SidebarProvider>

        </div>
    )
}

export default layout
