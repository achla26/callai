"use client"

import { LogOut, ChevronDown, User, Settings, HelpCircle } from 'lucide-react';
import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import Link from 'next/link';

const DashboardUserButton = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending || !data?.user) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "w-full h-10 px-3 flex items-center justify-between",
                        "rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                        "transition-colors focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-sidebar-ring focus-visible:ring-offset-2",
                        "ring-offset-sidebar"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-sidebar-primary flex items-center justify-center">
                            <User className="size-3.5 text-sidebar-primary-foreground" />
                        </div>
                        <span className="text-sm font-medium tracking-tight">
                            {data.user.name || "Account"}
                        </span>
                    </div>
                    <ChevronDown className="size-4 opacity-70" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                side="top"
                className={cn(
                    "w-[var(--radix-dropdown-menu-trigger-width)]",
                    "bg-sidebar border border-sidebar-border rounded-md",
                    "shadow-lg overflow-hidden z-50 p-1",
                    "data-[side=top]:mb-2 "
                )}
            >
                <DropdownMenuLabel className="px-2 py-1.5 text-xs text-muted-foreground ">
                    <h4 className='text-[14px] mb-1.5'>{data.user.name}</h4>
                    <p>{data.user.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="h-px bg-sidebar-border my-1" />

                <DropdownMenuItem asChild>
                    <Link
                        href="/settings"
                        className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-sm",
                            "text-sm cursor-pointer hover:bg-sidebar-accent",
                            "hover:text-sidebar-accent-foreground outline-none"
                        )}
                    >
                        <Settings className="size-4" />
                        Settings
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/help"
                        className={cn(
                            "flex items-center gap-2 px-2 py-1.5 rounded-sm",
                            "text-sm cursor-pointer hover:bg-sidebar-accent",
                            "hover:text-sidebar-accent-foreground outline-none"
                        )}
                    >
                        <HelpCircle className="size-4" />
                        Help Center
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="h-px bg-sidebar-border my-1" />

                <DropdownMenuItem asChild>
                    <button
                        onClick={() => authClient.signOut()}
                        className={cn(
                            "w-full flex items-center gap-2 px-2 py-1.5 rounded-sm",
                            "text-sm cursor-pointer text-red-500 hover:bg-red-500/10",
                            "hover:text-red-600 outline-none"
                        )}
                    >
                        <LogOut className="size-4" />
                        Sign Out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DashboardUserButton;