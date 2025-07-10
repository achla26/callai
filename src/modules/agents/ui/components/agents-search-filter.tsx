import { SearchIcon } from "lucide-react";

import { Input } from '@/components/ui/input';

import { useAgentFilters } from "../../hooks/use-agents-filter";

export const AgentSearchFilter = () => {
    const [filters, setFilters] = useAgentFilters();

    return (
        <div className="relative">
            <Input
                placeholder="Filer by name"
                className="h-9 bg-white w-[200px] pl-7"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
            />
            <SearchIcon className="size-4 absolute left-1/2 -translate-y-1/2" />
        </div>
    )
}