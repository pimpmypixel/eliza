import { ActionExample } from "@elizaos/core";

export const getPlacesExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What's happening near me?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me check some more what's happening near your location.",
                action: "GET_CURRENT_NEIGHBORHOOD_EVENTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found some more events and activities for you.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you find me a place to eat?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check look for a nice place to eat near you.",
                action: "GET_NEIGHBORHOOD_RESTAURANTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found some nice places to eat near you.",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Are there any vegan restaurants near me?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check look for vegan restaurants near you.",
                action: "GET_NEIGHBORHOOD_VEGAN_RESTAURANTS",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I found some nice vegan restaurants near you.",
            },
        },
    ],
];
