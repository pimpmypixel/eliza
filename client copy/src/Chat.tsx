import { Button } from "@/components/ui/button";
import type { TextResponse } from "@/api";
import { useSendMessageMutation } from "@/api";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGetAgentsQuery } from "@/api";
import { RotateCw, SquarePlus } from "lucide-react";
import { SettingsDialog } from "@/components/dialogs/SettingsDialog";
import { MessageDialog } from "@/components/dialogs/MessageDialog";
import { LocationDialog } from "@/components/dialogs/LocationDialog";
import { VoiceDialog } from "@/components/dialogs/VoiceDialog";
import { ShareDialog } from "@/components/dialogs/ShareDialog";
import "./App.css";
import { Onboarder } from "./components/Onboarder";

const durations: string[] = ["15 mins", "half hour", "1 hour", "3 hours", "6 hours", "1 day", "2 days", "3 days", "1 week", "2 weeks"];
const categories: string[] = ["nature", "budget", "local", "authentic", "family", "romantic", "adventure", "cultural", "luxury", "food", "art", "history", "sports", "relax", "exercise", "work"];

export default function Chat() {
    const { agentId } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<TextResponse[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { mutate: sendMessage, isPending } = useSendMessageMutation({ setMessages });
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDuration, setSelectedDuration] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [context, setContext] = useState<string | null>(null);
    const [town, setTown] = useState<string | null>(null);
    const [isContinuePrompt, setIsContinuePrompt] = useState(false);
    const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
    const [newLocation, setNewLocation] = useState("");
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        const isContinuePrompt = lastMessage?.action === 'CONTINUE';
        setIsContinuePrompt(isContinuePrompt);

        scrollToBottom();
    }, [messages]);

    const handleContext = () => {
        if (!agentId || !selectedCategories.length || !selectedDuration || !location) return;
        const duration = selectedDuration ?? 'some time';
        const interest = selectedCategories.length > 0 ? selectedCategories.join(', ') : 'whatever is nice around here';
        const context = `I'm in ${location}. I have ${duration} to explore. I'm interested in ${interest}.`;
        setContext(context);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!agentId || !selectedCategories.length || !selectedDuration || !location) return;

        // Add user message immediately to state
        let userMessage: TextResponse = {
            context: context ?? '',
            text: input || 'Let\'s do this!',
            user: "user",
        };

        setMessages((prev) => [...prev, userMessage]);
        sendMessage({ text: input || '', agentId, context });
        setInput("");
    };

    const switchLocation = () => {
        setLocation(null);
        setTown(null);
        setIsLocationModalOpen(true);
    }

    const handleContinue = async (answer: string) => {
        let userMessage: TextResponse = {
            context: '',
            text: answer,
            user: "user",
        };
        setIsContinuePrompt(false);
        setMessages((prev) => [...prev, userMessage]);
        sendMessage({ text: answer, agentId, context });
    }

    // Add new function to handle location submission
    const handleLocationSubmit = () => {
        if (newLocation.trim()) {
            setLocation(newLocation);
            setTown(newLocation.split(',')[0]); // Take first part before comma as town
        }
        setIsLocationModalOpen(false);
        setNewLocation("");
    };

    const handleGetLocation = async () => {
        setIsLoadingLocation(true);

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            const { latitude, longitude } = position.coords;
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
            );

            const data = await response.json();
            if (data.display_name) {
                const city = data.address.suburb ?? data.address.town// ?? data.address.display_name;
                setTown(city);
                const country = data.address.country;
                const loc = `${city ? city + ', ' : ''}${country ? country : ''}`;
                setLocation(loc);
            }
        } catch (error) {
            console.error('Error getting location:', error);
            setLocation(null);
        } finally {
            setIsLoadingLocation(false);
        }
    };

    useEffect(() => {
        handleGetLocation();
    }, []);

    useEffect(() => {
        handleContext();
    }, [selectedCategories, selectedDuration]);

    useEffect(() => {
        if (input) {
            handleSubmit({ preventDefault: () => { } } as React.FormEvent);
        }
    }, [input]);

    useEffect(() => {
        console.log(isPending);
    }, [isPending]);


    return (
        <div className="flex flex-col h-screen max-h-screen w-full">
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
                        <Onboarder
                            town={town}
                            submit={handleSubmit}
                            switchLocation={switchLocation}
                            durations={durations}
                            selectedDuration={selectedDuration}
                            setSelectedDuration={setSelectedDuration}
                            categories={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
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
                            <SettingsDialog
                                isPending={isPending}
                                isOpen={isSettingsModalOpen}
                                onOpenChange={setIsSettingsModalOpen}
                            />
                        </div>
                        <div className="mx-1">
                            <ShareDialog
                                isPending={isPending}
                                isOpen={isShareDialogOpen}
                                onOpenChange={setIsShareDialogOpen}
                            />
                        </div>
                        <div className="mx-1 scale-150">
                            <VoiceDialog
                                isPending={isPending}
                                onRecord={(text) => setInput(text)} />
                        </div>
                        <div className="mx-1">
                            <MessageDialog
                                isOpen={isMessageDialogOpen}
                                onOpenChange={setIsMessageDialogOpen}
                                input={input}
                                onInputChange={(value) => setInput(value)}
                                onSubmit={handleSubmit}
                                isPending={isPending}
                            />
                        </div>
                        <div className="mx-1">
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => navigate('/')}
                            >
                                <SquarePlus className={`h-4 w-4 ${isLoadingLocation ? 'animate-spin' : ''}`} />
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
            <LocationDialog
                isOpen={isLocationModalOpen}
                onOpenChange={setIsLocationModalOpen}
                newLocation={newLocation}
                onLocationChange={(value) => setNewLocation(value)}
                onSubmit={handleLocationSubmit}
                isLoadingLocation={isLoadingLocation}
                onGetLocation={handleGetLocation}
            />
        </div>
    );
}
