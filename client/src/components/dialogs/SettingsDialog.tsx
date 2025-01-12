import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/hooks/use-theme";
import { useUser } from '@clerk/clerk-react';

interface SettingsDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    isPending: boolean;
}

interface Setting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    command: () => void;
}

export function SettingsDialog({ isOpen, onOpenChange, isPending }: SettingsDialogProps) {
    const { setTheme } = useTheme();
    const { user } = useUser();
    console.log(user);

    const [generalSettings, setGeneralSettings] = useState<Setting[]>([
        {
            id: "dark-mode",
            title: "Dark Mode",
            description: "Enable dark mode for a better viewing experience at night",
            enabled: false,
            command: () => setTheme("dark"),
        },
        {
            id: "notifications",
            title: "Notifications",
            description: "Receive notifications when new updates are available",
            enabled: true,
            command: () => null,
        },
    ]);

    const [personalSettings, setPersonalSettings] = useState<Setting[]>([
        {
            id: "personal-wheelchair",
            title: "Wheelchair Accessible",
            description: "Prefer wheelchair accessible restaurants",
            enabled: false,
            command: () => null,
        },
        {
            id: "personal-dog-friendly",
            title: "Dog Friendly",
            description: "Prefer dog friendly places",
            enabled: false,
            command: () => null,
        },
    ]);

    const [gastroSettings, setGastroSettings] = useState<Setting[]>([
        {
            id: "gastro-vegan",
            title: "Vegan",
            description: "Prefer vegan restaurants",
            enabled: false,
            command: () => null,
        },
        {
            id: "gastro-vegetarian",
            title: "Vegetarian",
            description: "Prefer vegetarian restaurants",
            enabled: false,
            command: () => null,
        },
        {
            id: "gastro-organic",
            title: "Organic",
            description: "Prefer organic restaurants",
            enabled: false,
            command: () => null,
        },
    ]);

    const SettingsList = ({ settings, setSettings }: {
        settings: Setting[],
        setSettings: React.Dispatch<React.SetStateAction<Setting[]>>
    }) => (
        <div className="flex flex-col gap-4">
            {settings.map((setting) => (
                <div key={setting.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor={setting.id} className="font-medium">
                            {setting.title}
                        </label>
                        <Switch
                            id={setting.id}
                            checked={setting.enabled}
                            onCheckedChange={(checked) => {
                                if (setting.id === "dark-mode") {
                                    setTheme(checked ? "dark" : "light");
                                }
                                setSettings(prev =>
                                    prev.map(s =>
                                        s.id === setting.id
                                            ? { ...s, enabled: checked }
                                            : s
                                    )
                                );
                            }}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {setting.description}
                    </p>
                </div>
            ))}
        </div>
    );

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
                <DialogContent className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="general" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="personal">Personal</TabsTrigger>
                            <TabsTrigger value="gastro">Gastro</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general">
                            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/20 rounded-lg">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium">
                                        Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={user?.fullName ?? ''}
                                        className="w-full px-3 py-2 text-sm border rounded-md bg-background"
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={user?.emailAddresses[0]?.emailAddress ?? ''}
                                        className="w-full px-3 py-2 text-sm border rounded-md bg-background"
                                        readOnly
                                    />
                                </div>
                            </div>

                            <hr className="my-4" />
                            <SettingsList
                                settings={generalSettings}
                                setSettings={setGeneralSettings}
                            />
                        </TabsContent>
                        <TabsContent value="personal">
                            <SettingsList
                                settings={personalSettings}
                                setSettings={setPersonalSettings}
                            />
                        </TabsContent>
                        <TabsContent value="gastro">
                            <SettingsList
                                settings={gastroSettings}
                                setSettings={setGastroSettings}
                            />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}