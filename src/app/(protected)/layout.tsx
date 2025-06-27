import { requireAuth } from '@/utils/get-server-session';
import { SidebarProvider } from '@/components/ui/sidebar';
import DashboardSidebar from '@/modules/dashboard/ui/components/dashboard-sidebar';
import DashboardNavbar from '@/modules/dashboard/ui/components/dashboard-navbar';
export default async function Layout({
    children
}: {
    children: React.ReactNode
}) {
    await requireAuth();
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className='flex flex-col h-screen w-screen'>
                <DashboardNavbar />
                {children}
            </main>
        </SidebarProvider>
    );
}
