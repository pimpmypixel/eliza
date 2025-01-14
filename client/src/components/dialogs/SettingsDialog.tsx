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
import { useStore } from "@/store/useStore";

export function SettingsDialog() {
    const { isSettingsOpen, setIsSettingsOpen } = useStore((state) => state.app);
    const {
        isWheelchair, setIsWheelchair,
        isDogFriendly, setIsDogFriendly,
        isVegan, setIsVegan,
        isVegetarian, setIsVegetarian,
        isOrganic, setIsOrganic,
        isHalal, setIsHalal,
        isKosher, setIsKosher
    } = useStore((state) => state.user);


    const generateSettings = (category: 'general' | 'personal' | 'gastro') => {
        const settings = [
            {
                id: 'isWheelchair',
                title: 'Wheelchair',
                description: 'Toggle wheelchair accessibility setting',
                enabled: isWheelchair,
                setter: setIsWheelchair
            },
            {
                id: 'isDogFriendly',
                title: 'Dog Friendly',
                description: 'Toggle dog friendly setting',
                enabled: isDogFriendly,
                setter: setIsDogFriendly
            },
            {
                id: 'isVegan',
                title: 'Vegan',
                description: 'Toggle vegan setting',
                enabled: isVegan,
                setter: setIsVegan
            },
            {
                id: 'isVegetarian',
                title: 'Vegetarian',
                description: 'Toggle vegetarian setting',
                enabled: isVegetarian,
                setter: setIsVegetarian
            },
            {
                id: 'isOrganic',
                title: 'Organic',
                description: 'Toggle organic setting',
                enabled: isOrganic,
                setter: setIsOrganic
            },
            {
                id: 'isHalal',
                title: 'Halal',
                description: 'Toggle halal setting',
                enabled: isHalal,
                setter: setIsHalal
            },
            {
                id: 'isKosher',
                title: 'Kosher',
                description: 'Toggle kosher setting',
                enabled: isKosher,
                setter: setIsKosher
            }
        ];

        switch (category) {
            case 'personal':
                return settings.filter(setting =>
                    ['isWheelchair', 'isDogFriendly'].includes(setting.id));
            case 'gastro':
                return settings.filter(setting =>
                    ['isVegan', 'isVegetarian', 'isOrganic', 'isHalal', 'isKosher'].includes(setting.id));
            default:
                return [];
        }
    };

    const SettingsList = ({ category }: { category: 'general' | 'personal' | 'gastro' }) => (
        <div className="flex flex-col gap-4">
            {generateSettings(category).map((setting) => (
                <div key={setting.id} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <label htmlFor={setting.id} className="font-medium">
                            {setting.title}
                        </label>
                        <Switch
                            id={setting.id}
                            checked={setting.enabled}
                            onCheckedChange={setting.setter}
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
                onClick={() => setIsSettingsOpen(true)}
            >
                <SettingsIcon />
            </Button>

            <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
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
                            <hr className="my-4" />
                            <SettingsList category="general" />
                        </TabsContent>
                        <TabsContent value="personal">
                            <SettingsList category="personal" />
                        </TabsContent>
                        <TabsContent value="gastro">
                            <SettingsList category="gastro" />
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
        </>
    );
}