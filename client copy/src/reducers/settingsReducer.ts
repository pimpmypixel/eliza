export interface Setting {
    id: string;
    title: string;
    description: string;
    enabled: boolean;
    command: () => void;
}

export interface SettingsState {
    general: Setting[];
    personal: Setting[];
    gastro: Setting[];
}

type SettingsAction =
    | { type: 'TOGGLE_SETTING'; category: keyof SettingsState; id: string }
    | { type: 'RESET_SETTINGS' };

export const initialSettings: SettingsState = {
    general: [
        {
            id: "dark-mode",
            title: "Dark Mode",
            description: "Enable dark mode for a better viewing experience at night",
            enabled: false,
            command: () => null, // We'll handle theme separately
        },
        {
            id: "notifications",
            title: "Notifications",
            description: "Receive notifications when new updates are available",
            enabled: true,
            command: () => null,
        },
    ],
    personal: [
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
    ],
    gastro: [
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
    ],
};

export function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
    switch (action.type) {
        case 'TOGGLE_SETTING':
            return {
                ...state,
                [action.category]: state[action.category].map(setting =>
                    setting.id === action.id
                        ? { ...setting, enabled: !setting.enabled }
                        : setting
                ),
            };
        case 'RESET_SETTINGS':
            return initialSettings;
        default:
            return state;
    }
}