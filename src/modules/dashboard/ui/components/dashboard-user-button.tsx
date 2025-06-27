"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";

import { ChevronDown, CreditCard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
const DashboardUserButton = () => {
    const router = useRouter();

    const isMobile = useIsMobile();

    const { data, isPending } = authClient.useSession();

    const onLogOut = () => {
        authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/signin')
                }
            }
        })
    }

    if (isPending || !data?.user) return null;

    if (isMobile) {
        return (
            <Drawer>
                <DrawerTrigger>
                    <button
                        className={cn(
                            "w-full h-15 px-3 flex items-center justify-between",
                            "rounded-md hover:bg-primary ",
                            "transition-colors focus-visible:outline-none focus-visible:ring-2",
                            "focus-visible:ring-ring focus-visible:ring-offset-2",
                            "ring-offset-background glass text-primary-foreground ",
                        )}
                    >
                        <div className="flex items-center gap-2 overflow-hidden">
                            <div className="size-10 flex-shrink-0 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold uppercase">
                                {(data.user.name?.slice(0, 2) || "UA")}
                            </div>
                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="text-sm font-medium truncate">
                                    {data.user.name}
                                </span>
                                <span className="text-sm truncate">
                                    {data.user.email}
                                </span>
                            </div>

                        </div>
                        <ChevronDown className="size-4 opacity-70" />
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="size-10 flex-shrink-0 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold uppercase">
                                    {(data.user.name?.slice(0, 2) || "UA")}
                                </div>
                                <div className="flex flex-col items-start overflow-hidden">
                                    <span className="text-sm font-medium truncate">
                                        {data.user.name}
                                    </span>
                                    <span className="text-sm text-gray-500 truncate">
                                        {data.user.email}
                                    </span>
                                </div>
                            </div>
                        </DrawerTitle>
                        {/* <DrawerDescription>{data.user.email}</DrawerDescription> */}
                        <DrawerFooter>
                            <Button
                                variant="outline"
                                onClick={onLogOut}
                            >
                                <CreditCard className="size-4" />
                                Billing
                            </Button>
                            <Button
                                variant="outline"
                                onClick={onLogOut}
                            >
                                Logout
                                <LogOut className="size-4 text-muted" />
                            </Button>
                        </DrawerFooter>
                    </DrawerHeader>
                </DrawerContent>
            </Drawer>
        )
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        "w-full h-15 px-3 flex items-center justify-between",
                        "rounded-md hover:bg-primary ",
                        "transition-colors focus-visible:outline-none focus-visible:ring-2",
                        "focus-visible:ring-ring focus-visible:ring-offset-2",
                        "ring-offset-background glass text-primary-foreground ",
                    )}
                >
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="size-10 flex-shrink-0 rounded-full bg-yellow-400 flex items-center justify-center text-xs font-bold uppercase">
                            {(data.user.name?.slice(0, 2) || "UA")}
                        </div>
                        <div className="flex flex-col items-start overflow-hidden">
                            <span className="text-sm font-medium truncate">
                                {data.user.name}
                            </span>
                            <span className="text-sm truncate">
                                {data.user.email}
                            </span>
                        </div>

                    </div>
                    <ChevronDown className="size-4 opacity-70" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                side="left"
                className={cn(
                    "w-[260px]   border border-border rounded-md",
                    "shadow-lg overflow-hidden z-50 p-1 bg-background border-0 text-foreground",
                )}
            >
                <DropdownMenuLabel className="px-2 py-1.5 text-xs ">
                    <h4 className="text-[14px] font-medium mb-1.5">{data.user.name}</h4>
                    <p className="text-xs">{data.user.email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="h-px bg-sidebar-border my-1" />

                <DropdownMenuItem
                    onSelect={() => {
                        window.location.href = "/billing";
                    }}
                    className="flex items-center justify-between border-0 gap-2 px-2 py-1.5 rounded-sm text-sm cursor-pointer hover-bg"
                >
                    Billing
                    <CreditCard className="size-4 text-muted" />

                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={onLogOut}
                    className="flex items-center justify-between hover-bg gap-2 px-2 py-1.5 rounded-sm text-sm cursor-pointer border-0"
                >
                    Logout
                    <LogOut className="size-4 text-muted" />

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DashboardUserButton;
