import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { KeyboardIcon } from "lucide-react";

interface MessageDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    input: string;
    onInputChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    isPending: boolean;
}

export function MessageDialog({
    isOpen,
    onOpenChange,
    input,
    onInputChange,
    onSubmit,
    isPending,
}: MessageDialogProps) {
    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onOpenChange(true)}
            >
                <KeyboardIcon />
            </Button>

            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="fixed bottom-0 left-0 right-0 mb-0 rounded-b-none">
                    <DialogHeader>
                        <DialogTitle>Send a Message</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        onSubmit(e);
                        onOpenChange(false);
                    }} className="flex flex-col gap-4">
                        <Textarea
                            value={input}
                            onChange={(e) => onInputChange(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1"
                            disabled={isPending}
                        />
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "..." : "Send"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}