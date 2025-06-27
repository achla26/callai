"use client"

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import DashboardCommand from "@/modules/dashboard/ui/components/dashboard-command";
import { useEffect, useState } from "react";

const DashboardNavbar = () => {

    const { state, toggleSidebar, isMobile } = useSidebar();

    const [commandOpen, setCommandOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.metaKey && e.key === "k") {
                e.preventDefault();
                setCommandOpen(true);
            }
        };
        document.addEventListener("keydown", down);

        return () => {
            document.removeEventListener("keydown", down);
        };
    }, []);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault(); // Stop browser's default action
                setCommandOpen(true); // Open your custom menu
            }
        };

        // Use `window` + capture phase (`true`) to intercept early
        window.addEventListener('keydown', handleKeyDown, true);

        return () => {
            window.removeEventListener('keydown', handleKeyDown, true);
        };
    }, []);

    return (
        <>
            <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
            <nav className="flex gap-x-2 px-4 item-center py-3 border-b bg-background">
                <Button className="size-9" variant="outline" onClick={toggleSidebar} >
                    {(state === "collapsed") || isMobile ? <PanelLeftIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4" />}
                </Button>
                <Button
                    className="h-9  w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-forground"
                    variant="outline"
                    size="sm"
                    onClick={() => setCommandOpen(prev => !prev)}
                >
                    <SearchIcon className="size-4" />
                    Search
                    <kbd className="ml-auto text-xs  pointer-events-none inline-flex items-center gap-1 rounded border border-muted h-5 select-none item-center bg-muted p-1 text-[10px] font-medium text-muted-foreground">
                        <span>&#8984;</span>k
                    </kbd>
                </Button>
            </nav>
        </>
    );
};

export default DashboardNavbar;