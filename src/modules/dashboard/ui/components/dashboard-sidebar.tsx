"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { Home, Settings, Users, FileText, PieChart, Bell, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import DashboardUserButton from '@/modules/dashboard/ui/components/dashboard-user-button';
const DashboardSidebar = () => {
    const pathname = usePathname();

    const firstSection = [
        { href: "/dashboard", icon: Home, label: "Home" },
        { href: "/agents", icon: PieChart, label: "Agents" },
        { href: "/meetings", icon: Users, label: "Meetings" },
    ];

    const secondSection = [
        { href: "/dashboard/settings", icon: Settings, label: "Settings" },
        { href: "/dashboard/notifications", icon: Bell, label: "Notifications" }
    ];

    return (
        <Sidebar className="h-screen w-64 fixed left-0 top-0 border-r">
            <SidebarHeader className="p-4 border-b">
                <h1 className="text-xl font-semibold">Dashboard</h1>
            </SidebarHeader>

            <SidebarContent className="flex-1 overflow-y-auto">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors  ",
                                            pathname === item.href ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                        )}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <p className="text-xs font-medium text-muted-foreground px-4 py-2">Settings</p>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        asChild
                                        className={cn(
                                            "h-10",
                                            pathname === item.href && "bg-linear-to-r/oklch"
                                        )}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span className="text-sm font-medium tracking-tight">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="p-4 border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DashboardUserButton />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default DashboardSidebar;