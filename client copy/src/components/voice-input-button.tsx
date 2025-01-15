import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";

interface VoiceInputButtonProps {
    onClick: () => void;
}

export function VoiceInputButton({ onClick }: VoiceInputButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onClick}
        >
            <MicIcon />
        </Button>
    );
}