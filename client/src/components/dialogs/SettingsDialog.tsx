import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";

interface SettingsDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SettingsDialog({ isOpen, onOpenChange }: SettingsDialogProps) {
    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onOpenChange(true)}
            >
                <SettingsIcon />
            </Button>

            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        {/* Settings content goes here */}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}