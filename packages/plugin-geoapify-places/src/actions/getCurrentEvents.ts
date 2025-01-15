import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    Action,
    ActionExample,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import { validateGeoapifyConfig } from "../environment";
import { getPlacesTemplate } from "../templates";
import { getPlacesExamples } from "../examples";
import { createPlacesService } from "../services";

export const getCurrentEvents: Action = {
    name: "GET_CURRENT_EVENTS",
    similes: [
        "EVENTS",
        "ACTIVITIES",
        "EVENTS_NEAR_ME",
        "ACTIVITIES_NEAR_ME",
        "RESTAURANTS_NEAR_ME",
        "CHECK_EVENTS",
        "CHECK_ACTIVITIES",
        "CHECK_RESTAURANTS",
        "EVENTS_CHECK",
        "RESTAURANTS_CHECK",
        "ACTIVITIES_CHECK",
        "EVENTS_OUTSIDE",
        "ACTIVITIES_OUTSIDE",
    ],
    description: "Get events OR restaurants OR activities for a given location",
    validate: async (runtime: IAgentRuntime) => {
        await validateGeoapifyConfig(runtime);
        return true;
    },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        // Initialize/update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        }
        state = await runtime.updateRecentMessageState(state);

        // state -> context
        const weatherContext = composeContext({
            state,
            template: getPlacesTemplate,
        });

        // context -> content
        const content = await generateMessageResponse({
            runtime,
            context: weatherContext,
            modelClass: ModelClass.SMALL,
        });

        // parse content
        const hasLocation =
            content?.city && content?.country && !content?.error;

        if (!hasLocation) {
            return;
        }

        // Instantiate API service
        const config = await validateGeoapifyConfig(runtime);
        const placesService = createPlacesService(
            config.GEOAPIFY_API_KEY
        );

        // Fetch events & respond
        try {
            const placesData = await placesService.getPlaces(
                String(content?.city || ""),
                content?.country ? String(content?.country) : undefined
            );
            elizaLogger.success(
                `Successfully fetched places for ${content.city}, ${content.country}`
            );

            if (callback) {
                callback({
                    text: `I found some nice events or activities near you.`,
                    content: placesData,
                });

                return true;
            }
        } catch (error) {
            elizaLogger.error("Error in GET_CURRENT_WEATHER handler:", error);

            callback({
                text: `Error fetching weather: ${error.message}`,
                content: { error: error.message },
            });

            return false;
        }

        return;
    },
    examples: getPlacesExamples as ActionExample[][],
} as Action;
