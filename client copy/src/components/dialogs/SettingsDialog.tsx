import { useReducer } from "react";
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
import { settingsReducer, initialSettings, Setting } from "@/reducers/settingsReducer";

interface SettingsDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    isPending: boolean;
}

export function SettingsDialog({ isOpen, onOpenChange, isPending }: SettingsDialogProps) {
    const { setTheme } = useTheme();
    const { user } = useUser();
    const [settings, dispatch] = useReducer(settingsReducer, initialSettings);

    const SettingsList = ({ category, items }: { category: 'general' | 'personal' | 'gastro', items: Setting[] }) => (
        <div className="flex flex-col gap-4">
            {items.map((setting) => (
                <div key={setting.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor={setting.id} className="font-medium">
                            {setting.title}
                        </label>
                        <Switch
                            id={setting.id}
                            checked={setting.enabled}
                            onCheckedChange={() => {
                                if (setting.id === "dark-mode") {
                                    setTheme(!setting.enabled ? "dark" : "light");
                                }
                                dispatch({ type: 'TOGGLE_SETTING', category, id: setting.id });
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
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium">
                                        Profile Picture
                                    </label>
                                    <div className="flex items-center justify-center p-4 border rounded-md bg-background">
                                        <img
                                            src={user?.imageUrl}
                                            alt="Profile"
                                            className="w-16 h-16 rounded-full"
                                        />
                                    </div>
                                </div>
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
                                category="general"
                                items={settings.general}
                            />
                        </TabsContent>
                        <TabsContent value="personal">
                            <SettingsList
                                category="personal"
                                items={settings.personal}
                            />
                        </TabsContent>
                        <TabsContent value="gastro">
                            <SettingsList
                                category="gastro"
                                items={settings.gastro}
                            />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}