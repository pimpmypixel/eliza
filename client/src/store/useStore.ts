import { create } from 'zustand'
import type { TextResponse } from "@/api";
// import { useSendMessageMutation } from "@/api";

type AppState = {
    isMobileMenuOpen: boolean
    setIsMobileMenuOpen: (isOpen: boolean) => void

    isSettingsOpen: boolean
    setIsSettingsOpen: (isOpen: boolean) => void

    currentStep: number
    setCurrentStep: (step: number) => void

    isSubmitting: boolean
    setIsSubmitting: (isSubmitting: boolean) => void

    isTypedMessageDialogOpen: boolean
    setIsTypedMessageDialogOpen: (isOpen: boolean) => void

    isShareDialogOpen: boolean
    setIsShareDialogOpen: (isOpen: boolean) => void

    isVoiceDialogOpen: boolean
    setIsVoiceDialogOpen: (isOpen: boolean) => void

    isVoiceRecording: boolean
    setIsVoiceRecording: (isRecording: boolean) => void
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

    typedInput: string
    setTypedInput: (typedInput: string) => void

    spokenInput: string
    setSpokenInput: (spokenInput: string) => void

    context: string
    setContext: (context: string) => void

    messages: TextResponse[]
    setMessages: (messages: TextResponse[]) => void
    addMessage: (message: TextResponse) => void
    clearMessages: () => void

    isContinuePrompt: boolean
    setIsContinuePrompt: (isContinuePrompt: boolean) => void
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

type Store = {
    app: AppState,
    user: UserState,
    agent: AgentState,
    trip: TripState
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
        isTypedMessageDialogOpen: false,
        setIsTypedMessageDialogOpen: (isOpen) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isTypedMessageDialogOpen: isOpen
                }
            })),
        isShareDialogOpen: false,
        setIsShareDialogOpen: (isOpen) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isShareDialogOpen: isOpen
                }
            })),
        isVoiceDialogOpen: false,
        setIsVoiceDialogOpen: (isOpen) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isVoiceDialogOpen: isOpen
                }
            })),
        isVoiceRecording: false,
        setIsVoiceRecording: (isRecording) =>
            set((state) => ({
                app: {
                    ...state.app,
                    isVoiceRecording: isRecording
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
        typedInput: '',
        setTypedInput: (typedInput) =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    typedInput: typedInput
                }
            })),
        spokenInput: '',
        setSpokenInput: (spokenInput) =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    spokenInput: spokenInput
                }
            })),
        context: '',
        setContext: (context) =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    context: context
                }
            })),
        messages: [],
        setMessages: (messages) =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    messages
                }
            })),
        addMessage: (message) => {
            console.log(message);
            return (
                set((state) => ({
                    agent: {
                        ...state.agent,
                        messages: [...state.agent.messages, message]
                    }
                })))
        },
        clearMessages: () =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    messages: []
                }
            })),
        isContinuePrompt: false,
        setIsContinuePrompt: (isContinuePrompt) =>
            set((state) => ({
                agent: {
                    ...state.agent,
                    isContinuePrompt: isContinuePrompt
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
}))