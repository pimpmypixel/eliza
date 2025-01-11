import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RotateCw } from "lucide-react";

interface LocationDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    newLocation: string;
    onLocationChange: (value: string) => void;
    onSubmit: () => void;
    isLoadingLocation: boolean;
    onGetLocation: () => void;
}

export function LocationDialog({
    isOpen,
    onOpenChange,
    newLocation,
    onLocationChange,
    onSubmit,
    isLoadingLocation,
    onGetLocation,
}: LocationDialogProps) {
    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={onGetLocation}
            >
                <RotateCw className={`h-4 w-4 ${isLoadingLocation ? 'animate-spin' : ''}`} />
            </Button>

            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Enter New Location</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                    }}>
                        <Input
                            value={newLocation}
                            onChange={(e) => onLocationChange(e.target.value)}
                            placeholder="e.g. Paris, France"
                            className="mb-4"
                        />
                        <Button type="submit">Save Location</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}