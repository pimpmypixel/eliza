import { Button } from "@/components/ui/button";
import type { TextResponse } from "@/api";
import { useSendMessageMutation } from "@/api";
import { useEffect, useRef, useState, SetStateAction } from "react";
import { useGetAgentsQuery } from "@/api";
import { MessageDialog } from "@/components/dialogs/MessageDialog";
import { VoiceDialog } from "@/components/dialogs/VoiceDialog";
import { ShareDialog } from "@/components/dialogs/ShareDialog";
import { useStore } from "@/store/useStore";
import { Navbar } from "@/components/Navbar";
import { useGeolocation } from '@/hooks/use-geolocation';
import "../css/App.css";

// const agentId = '6a4cce9c-ce72-02d7-826e-f4c073484929'; //agents?.[0]?.id;
// const durations: string[] = ["15 mins", "half hour", "1 hour", "3 hours", "6 hours", "1 day", "2 days", "3 days", "1 week", "2 weeks"];
// const categories: string[] = ["nature", "budget", "local", "authentic", "family", "romantic", "adventure", "cultural", "luxury", "food", "art", "history", "sports", "relax", "exercise", "work"];

export default function Chat() {
    const { data: agents, isLoading } = useGetAgentsQuery()
    const agentId = agents?.[0]?.id;

    const {
        messages, setMessages, addMessage, clearMessages,
        input, setInput,
        context, setContext,
        typedInput, setTypedInput,
        spokenInput, setSpokenInput
    } = useStore((state) => state.agent);

    const {
        isTypedMessageDialogOpen, setIsTypedMessageDialogOpen,
        isShareDialogOpen, setIsShareDialogOpen,
        isVoiceDialogOpen, setIsVoiceDialogOpen
    } = useStore((state) => state.app);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { mutate: sendMessage, isPending } = useSendMessageMutation({
        setMessages: (value: SetStateAction<TextResponse[]>) => setMessages(value)
    });
    const [isContinuePrompt, setIsContinuePrompt] = useState(false);
    const [{ location, town, isLoading: isLoadingLocation }, getLocation] = useGeolocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        console.log(messages);
        const lastMessage = messages[messages.length - 1];
        const isContinuePrompt = lastMessage?.action === 'CONTINUE';
        setIsContinuePrompt(isContinuePrompt);

        scrollToBottom();
    }, [messages]);

    // const handleContext = () => {
    //     if (!agentId || !selectedCategories.length || !selectedDuration || !location) return;
    //     const duration = selectedDuration ?? 'some time';
    //     const interest = selectedCategories.length > 0 ? selectedCategories.join(', ') : 'whatever is nice around here';
    //     const context = `I'm in ${location}. I have ${duration} to explore. I'm interested in ${interest}.`;
    //     setContext(context);
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!agentId || !selectedCategories.length || !selectedDuration || !location) return;
        // Add user message immediately to state
        let userMessage: TextResponse = {
            context: context ?? '',
            text: input || 'Let\'s do this!',
            user: "user",
        };

        debugger;

        if (spokenInput) {
            userMessage.text = spokenInput;
        } else if (typedInput) {
            userMessage.text = typedInput;
        }

        addMessage(userMessage);
        sendMessage({ text: input || '', agentId, context });
        setInput("");
        setTypedInput("");
        setSpokenInput("");
    };

    const handleContinue = async (answer: string) => {
        let userMessage: TextResponse = {
            context: '',
            text: answer,
            user: "user",
        };
        setIsContinuePrompt(false);
        addMessage(userMessage);
        sendMessage({
            text: answer,
            agentId,
            context,
        });
    }

    useEffect(() => {
        if (typedInput || spokenInput) {
            handleSubmit({ preventDefault: () => { } } as React.FormEvent);
        }
    }, [typedInput, spokenInput]);


    useEffect(() => {
        console.log(isPending);
    }, [isPending]);

    console.log(messages);


    return (
        <div className="flex flex-col h-screen max-h-screen w-full">
            <Navbar />
            <div className="flex-1 min-h-0 overflow-y-auto p-4">
                <div className="max-w-3xl mx-auto space-y-3 text-sm">
                    {messages.length > 0 ? (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`text-left flex ${message.user === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                    }`}
                            >
                                <pre
                                    style={
                                        message.user === "user" ? {
                                            fontSize: '100%',
                                        } : {
                                            fontSize: '70%',
                                        }}
                                    className={`max-w-[80%] rounded-lg px-4 py-2 whitespace-pre-wrap ${message.user === "user"
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                        }`}
                                >
                                    {message.text}
                                </pre>
                            </div>
                        ))
                    ) : (
                        <div>Hej</div>
                    )}{
                        isContinuePrompt && <div className="text-center text-sm text-muted-foreground">
                            <Button
                                size="xs"
                                className="text-xs p-1 px-2"
                                onClick={() => handleContinue('yes')}
                            >
                                Yes please!
                            </Button>
                            <Button
                                size="xs"
                                className="text-xs p-1 ml-2"
                                onClick={() => handleContinue('no')}
                            >
                                No, thanks.
                            </Button>
                        </div>
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>

            <div className="border-t p-4 bg-background">
                <div className="max-w-3xl mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="mx-1">
                            <ShareDialog
                                isPending={isPending}
                                isOpen={isShareDialogOpen}
                                onOpenChange={setIsShareDialogOpen}
                            />
                        </div>
                        <div className="mx-1 scale-150">
                            <VoiceDialog isPending={isPending} />
                        </div>
                        <div className="mx-1">
                            <MessageDialog onSubmit={handleSubmit} isPending={isPending} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
