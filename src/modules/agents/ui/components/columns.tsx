"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AgentGetOne } from "../../types"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { CornerRightDownIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AgentGetOne>[] = [
    {
        accessorKey: "name",
        header: "Agent Name",
        cell: ({ row }) => {
            return (
                <div className="flex flec-col gap-y-1">
                    <div className="flex item-center gap-x-2">
                        <GeneratedAvatar />
                        <span className="font-semibold capitalize">{row.original.name}</span>
                    </div>

                    <div className="flex items-center gap-x-2">
                        <CornerRightDownIcon className="size-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize" >
                            {row.original.instructions}
                        </span>
                    </div>
                </div>
            );
        }
    },
    {
        accessorKey: "meetingCount",
        header: "Meetings",
        cell: () => {
            return (
                <Badge
                    variant="outline"
                    className="flex items-center gap-x-2 [&>svg]:size-4"
                >
                    <VideoIcon className="text-blue-700" />
                    5 meetings
                </Badge>
            );
        }
    },
]