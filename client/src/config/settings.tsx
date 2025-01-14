import { ChartIcon, WalletIcon, MagnifierIcon } from "../components/Icons";

export interface SettingsProps {
    title: string;
    description: string;
    icon: JSX.Element;
    component: JSX.Element;
}

export const settingsList: SettingsProps[] = [
    {
        title: "1 - General",
        description:
            "First you quickly check a few general boxes about you and how you want to use me.",
        icon: <ChartIcon />,
        component: <div>General Settings Form Component</div>,
    },
    {
        title: "2 - Travel Preferences",
        description:
            "Next, you tell me how you prefer things when travelling.",
        icon: <WalletIcon />,
        component: <div>Travel Settings Form Component</div>,
    },
    {
        title: "3 - Extra details",
        description:
            "Finally, you tell me what you want to do when you arrive.",
        icon: <MagnifierIcon />,
        component: <div>Arrival Settings Form Component</div>,
    },
];