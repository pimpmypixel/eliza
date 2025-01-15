import { Plugin } from "@elizaos/core";
import { getCurrentWeatherAction } from "./actions/getCurrentEvents";

export * as actions from "./actions";

export const openWeatherPlugin: Plugin = {
    name: "openweather",
    description: "OpenWeather plugin for Eliza",
    actions: [getCurrentWeatherAction],
    evaluators: [],
    providers: [],
};
export default openWeatherPlugin;
