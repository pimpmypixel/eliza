import { createContext, useContext, useReducer, ReactNode } from 'react';

// Define the state interface
interface GlobalStateState {
    general: {
        // Add more fields as needed
        isConfigured: boolean;
    };
    travel: {
        // Add more fields as needed
        preferences: string[];
    };
    arrival: {
        // Add more fields as needed
        activities: string[];
    };
}

// Define action types
type ActionType =
    | { type: 'UPDATE_GENERAL'; payload: Partial<GlobalStateState['general']> }
    | { type: 'UPDATE_TRAVEL'; payload: Partial<GlobalStateState['travel']> }
    | { type: 'UPDATE_ARRIVAL'; payload: Partial<GlobalStateState['arrival']> }
    | { type: 'RESET_SETTINGS' };

// Initial state
const initialState: GlobalStateState = {
    general: {
        isConfigured: false,
    },
    travel: {
        preferences: [],
    },
    arrival: {
        activities: [],
    },
};

// Create context
const GlobalStateContext = createContext<{
    state: GlobalStateState;
    dispatch: React.Dispatch<ActionType>;
} | null>(null);

// Reducer function
function globalStateReducer(state: GlobalStateState, action: ActionType): GlobalStateState {
    switch (action.type) {
        case 'UPDATE_GENERAL':
            return {
                ...state,
                general: {
                    ...state.general,
                    ...action.payload,
                },
            };
        case 'UPDATE_TRAVEL':
            return {
                ...state,
                travel: {
                    ...state.travel,
                    ...action.payload,
                },
            };
        case 'UPDATE_ARRIVAL':
            return {
                ...state,
                arrival: {
                    ...state.arrival,
                    ...action.payload,
                },
            };
        case 'RESET_SETTINGS':
            return initialState;
        default:
            return state;
    }
}

// Provider component
export function GlobalStateProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(globalStateReducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
}

// Custom hook to use the settings context
export function useGlobalState() {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error('useGlobalState must be used within a GlobalStateProvider');
    }
    return context;
}