import { create } from 'zustand'
import type { TextResponse } from "@/api";
import { useSendMessageMutation } from "@/api";

type AppState = {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (isOpen: boolean) => void
    isSettingsOpen: boolean
    setIsSettingsOpen: (isOpen: boolean) => void
    currentStep: number
    setCurrentStep: (step: number) => void
    isSubmitting: boolean
    setIsSubmitting: (isSubmitting: boolean) => void
    // Add more state and actions as needed
}

type UserState = {
    isWheelchair: boolean
    setIsWheelchair: (setIsWheelchair: boolean) => void
    isDogFriendly: boolean
    setIsDogFriendly: (setIsDogFriendly: boolean) => void
    // Food preferences
    isVegan: boolean
    setIsVegan: (setIsVegan: boolean) => void
    isVegetarian: boolean
    setIsVegetarian: (setIsVegetarian: boolean) => void
    isOrganic: boolean
    setIsOrganic: (setIsOrganic: boolean) => void
    isHalal: boolean
    setIsHalal: (setIsHalal: boolean) => void
    isKosher: boolean
    setIsKosher: (setIsKosher: boolean) => void
    // Budget
    budget: number
    setBudget: (isOpen: number) => void
}

type AgentState = {
    input: string
    setInput: (input: string) => void
}

type TripState = {
    tripData: {
        destination: string
        startDate: Date | undefined
        duration: string
        travelStyle: string
        budget: string
    }
    updateTripData: <K extends keyof TripState['tripData']>(
        key: K,
        value: TripState['tripData'][K]
    ) => void
    resetTripData: () => void
}

type MessagesState = {
    messages: TextResponse[]
    setMessages: (messages: TextResponse[]) => void
    addMessage: (message: TextResponse) => void
    clearMessages: () => void
}

type Store = {
    app: AppState,
    user: UserState,
    agent: AgentState,
    trip: TripState,
    messages: MessagesState
}

export const useStore = create<Store>((set) => ({
    app: {
        isMobileMenuOpen: false,
        setIsMobileMenuOpen: (isOpen) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isMobileMenuOpen: isOpen
                }
            })),
        isSettingsOpen: false,
        setIsSettingsOpen: (isOpen) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isSettingsOpen: isOpen
                }
            })),
        currentStep: 0,
        setCurrentStep: (step) =>
            set((state) => ({
                app: {
                    ...state.app,
                    currentStep: step
                }
            })),

        isSubmitting: false,
        setIsSubmitting: (isSubmitting) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isSubmitting
                }
            })),
    },
    user: {
        isWheelchair: false,
        setIsWheelchair: (setIsWheelchair) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isWheelchair: setIsWheelchair
                }
            })),
        isDogFriendly: false,
        setIsDogFriendly: (setIsDogFriendly) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isDogFriendly: setIsDogFriendly
                }
            })),
        isVegan: false,
        setIsVegan: (setIsVegan) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isVegan: setIsVegan
                }
            })),
        isVegetarian: false,
        setIsVegetarian: (setIsVegetarian) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isVegetarian: setIsVegetarian
                }
            })),
        isOrganic: false,
        setIsOrganic: (setIsOrganic) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isOrganic: setIsOrganic
                }
            })),
        isHalal: false,
        setIsHalal: (setIsHalal) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isHalal: setIsHalal
                }
            })),
        isKosher: false,
        setIsKosher: (setIsKosher) =>
            set((state) => ({
                user: {
                    ...state.user,
                    isKosher: setIsKosher
                }
            })),
        budget: 0,
        setBudget: (setBudget) =>
            set((state) => ({
                user: {
                    ...state.user,
                    budget: setBudget
                }
            })),

    },
    agent: {
        input: '',
        setInput: (input) =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    input: input
                }
            })),
    },
    trip: {

        tripData: {
            destination: '',
            startDate: undefined,
            duration: '',
            travelStyle: '',
            budget: ''
        },

        updateTripData: (key, value) =>
            set((state) => ({
                trip: {
                    ...state.trip,
                    tripData: {
                        ...state.trip.tripData,
                        [key]: value
                    }
                }
            })),

        resetTripData: () =>
            set((state) => ({
                trip: {
                    ...state.trip,
                    tripData: {
                        destination: '',
                        startDate: undefined,
                        duration: '',
                        travelStyle: '',
                        budget: ''
                    }
                }
            }))
    },
    messages: {
        messages: [],
        setMessages: (messages) =>
            set((state) => ({
                messages: {
                    ...state.messages,
                    messages
                }
            })),
        addMessage: (message) =>
            set((state) => ({
                messages: {
                    ...state.messages,
                    messages: [...state.messages.messages, message]
                }
            })),
        clearMessages: () =>
            set((state) => ({
                messages: {
                    ...state.messages,
                    messages: []
                }
            }))
    }
}))