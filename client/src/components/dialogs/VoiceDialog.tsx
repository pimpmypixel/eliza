import "regenerator-runtime/runtime";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, CheckIcon, Loader2 } from "lucide-react";
import { useStore } from "@/store/useStore";

interface VoiceDialogProps {
    // onRecord?: (text: string) => void;
    isPending: boolean;
}

let mediaRecorder: MediaRecorder | null = null;
let audioText;
const options = { mimeType: 'video/webm' };

export function VoiceDialog({ isPending }: VoiceDialogProps) {
    let currentText = '';
    const [error, setError] = useState<string | null>(null);
    const { spokenInput, setSpokenInput } = useStore((state) => state.agent);
    const {
        isVoiceDialogOpen, setIsVoiceDialogOpen,
        isVoiceRecording, setIsVoiceRecording } = useStore((state) => state.app);


    const startRec = () => {
        if (isPending) return;
        setIsVoiceRecording(true);
    };

    const stopRec = async () => {
        if (isVoiceRecording && mediaRecorder && mediaRecorder.state !== 'inactive') {
            try {
                // Stop recording
                mediaRecorder.stop();

                // Stop all tracks in the stream
                if (mediaRecorder.stream) {
                    mediaRecorder.stream.getTracks().forEach(track => {
                        track.stop();
                    });
                }

                // Reset mediaRecorder
                mediaRecorder = null;

                // Reset state
                setIsVoiceRecording(false);
                currentText = '';
                audioText = '';
                setSpokenInput('');
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
    };

    const deepGramAudio2text = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => {
                if (!MediaRecorder.isTypeSupported('audio/webm')) {
                    setError('Browser not supported');
                }

                mediaRecorder = new MediaRecorder(stream, options);

                const socket = new WebSocket(`wss://api.deepgram.com/v1/listen`, [
                    'token',
                    '23c046460b64968eb517693d3e433fb22368ee85',
                ]);

                socket.onopen = () => {
                    mediaRecorder?.addEventListener('dataavailable', async (event) => {
                        if (event.data.size > 0 && socket.readyState == 1) {
                            socket.send(event.data);
                        }
                    });
                };

                mediaRecorder.start(1100);
                console.log('started');

                socket.onmessage = async (message) => {
                    const received = JSON.parse(message.data);
                    const transcript = received.channel?.alternatives[0].transcript;
                    if (transcript && received.is_final) {
                        currentText = currentText.concat(' ' + transcript);
                        audioText = currentText;
                        console.log(audioText);
                        setSpokenInput(audioText);
                        setIsVoiceRecording(false)
                        setIsVoiceDialogOpen(false);
                    }
                };
            });
    };

    useEffect(() => {
        if (isVoiceRecording) {
            deepGramAudio2text();
        }
    }, [isVoiceRecording]);


    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsVoiceDialogOpen(true)}
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Mic className={`text-primary h-4 w-4 ${isVoiceRecording ? 'text-primary animate-pulse' : ''}`} />
                )}
            </Button>

            <Dialog open={isVoiceDialogOpen} onOpenChange={setIsVoiceDialogOpen}>
                <DialogContent className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <DialogTitle>Talk to me!</DialogTitle>
                    <div className="flex flex-col items-center gap-4 py-8">
                        {error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <>
                                <Mic className="h-16 w-16 animate-pulse text-primary" />
                                <p>Microphone: {isVoiceRecording ? 'on' : 'off'}</p>
                                <Button
                                    type="button"
                                    variant={isVoiceRecording ? "destructive" : "default"}
                                    onClick={isVoiceRecording ? stopRec : startRec}
                                >
                                    {isVoiceRecording ? 'Stop' : 'Start'}
                                </Button>
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}