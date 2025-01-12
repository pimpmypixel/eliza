import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";

interface ShareDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ShareDialog({ isOpen, onOpenChange }: ShareDialogProps) {
    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Check out this itinerary!',
                text: 'I made a trip with AItinerary for you!',
                url: window.location.href,
            });
        } catch (error) {
            console.log('Error sharing:', error);
        }
    };

    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => onOpenChange(true)}
            >
                <Share2 className="h-4 w-4" />
            </Button>

            <Dialog open={isOpen} onOpenChange={onOpenChange}>
                <DialogContent className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <DialogHeader>
                        <DialogTitle>Share Conversation</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-4">
                        <Button onClick={handleShare}>
                            Share via System Dialog
                        </Button>
                        <Button onClick={() => navigator.clipboard.writeText(window.location.href)}>
                            Copy Link
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}