import { Button } from "@/components/ui/button";

interface Props {
    page: number;
    totalPages: number;
    onPageChnage: (page: number) => void;
}

export const DataPagination = ({
    page,
    totalPages,
    onPageChnage
}: Props) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex text-sm text-muted-foreground">
                Pages {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    disabled={page === 1}
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChnage(Math.max(1, page - 1))}
                >
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages}
                    size="sm"
                    variant="outline"
                    onClick={() => onPageChnage(Math.min(totalPages, page + 1))}>
                    Next
                </Button>
            </div>
        </div>
    )
};