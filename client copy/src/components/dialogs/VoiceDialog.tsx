import "regenerator-runtime/runtime";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, CheckIcon, Loader2 } from "lucide-react";

interface VoiceDialogProps {
    onRecord?: (text: string) => void;
    isPending: boolean;
}

let mediaRecorder: MediaRecorder | null = null;
let audioText;
const options = { mimeType: 'video/webm' };

export function VoiceDialog({ onRecord, isPending }: VoiceDialogProps) {
    let currentText = '';
    const [isPressed, setIsPressed] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [record, setRecord] = useState(false);
    // const [isRecording, setIsRecording] = useState(false);
    const [text, setText] = useState('');


    const startRec = () => {
        if (isPending) return;
        setRecord(true);
        setText('');
    };

    const stopRec = async () => {
        if (record && mediaRecorder && mediaRecorder.state !== 'inactive') {
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
                setRecord(false);
                currentText = '';
                audioText = '';
                setText('');
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
                        // console.log(audioText);
                        setText(audioText);
                        onRecord(audioText);
                        setIsPressed(false)
                    }
                };
            });
    };

    useEffect(() => {
        if (record) {
            deepGramAudio2text();
        }
    }, [record]);


    return (
        <>
            <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setIsPressed(true)}
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Mic className={`text-primary h-4 w-4 ${record ? 'text-primary animate-pulse' : ''}`} />
                )}
            </Button>

            <Dialog open={isPressed} onOpenChange={setIsPressed}>
                <DialogContent className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <DialogTitle>Talk to me!</DialogTitle>
                    <div className="flex flex-col items-center gap-4 py-8">
                        {error ? (
                            <div className="text-red-500">{error}</div>
                        ) : (
                            <>
                                <Mic className="h-16 w-16 animate-pulse text-primary" />
                                <p>Microphone: {record ? 'on' : 'off'}</p>
                                <Button
                                    type="button"
                                    variant={record ? "destructive" : "default"}
                                    onClick={record ? stopRec : startRec}
                                >
                                    {record ? 'Stop' : 'Start'}
                                </Button>
                                {/* <p className="text-sm text-muted-foreground">{text}</p> */}
                            </>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}