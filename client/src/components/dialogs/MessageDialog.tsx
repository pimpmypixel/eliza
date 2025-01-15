import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { KeyboardIcon } from "lucide-react";
import { useStore } from "@/store/useStore";

interface MessageDialogProps {
    onSubmit: (e: React.FormEvent) => void;
    isPending: boolean;
}

export function MessageDialog({ onSubmit, isPending }: MessageDialogProps) {
    const { typedInput, setTypedInput } = useStore((state) => state.agent);
    const { isTypedMessageDialogOpen, setIsTypedMessageDialogOpen } = useStore((state) => state.app);

    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsTypedMessageDialogOpen(true)}
            >
                <KeyboardIcon />
            </Button>

            <Dialog open={isTypedMessageDialogOpen} onOpenChange={setIsTypedMessageDialogOpen}>
                <DialogContent className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <DialogHeader>
                        <DialogTitle>Write me a message</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={(e) => {
                        onSubmit(e);
                        setIsTypedMessageDialogOpen(false);
                    }} className="flex flex-col gap-4">
                        <Textarea
                            value={typedInput}
                            onChange={(e) => setTypedInput(e.target.value)}
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