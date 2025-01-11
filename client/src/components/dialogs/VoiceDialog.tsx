import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic } from "lucide-react";

interface VoiceDialogProps {
    onRecord?: (audio: Blob) => void;
}

export function VoiceDialog({ onRecord }: VoiceDialogProps) {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onTouchStart={() => setIsPressed(true)}
                onTouchEnd={() => setIsPressed(false)}
            >
                <Mic className="h-4 w-4" />
            </Button>

            <Dialog open={isPressed} onOpenChange={setIsPressed}>
                <DialogContent className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="flex flex-col items-center gap-4 py-8">
                        <Mic className="h-16 w-16 animate-pulse text-primary" />
                        <p>Listening...</p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}