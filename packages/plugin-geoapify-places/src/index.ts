import { Plugin } from "@elizaos/core";
import { getCurrentEvents } from "./actions/getCurrentEvents";
import { getRestaurants } from "./actions/getRestaurants";

export * as actions from "./actions";

export const geoapifyPlacesPlugin: Plugin = {
    name: "geoapify-places",
    description: "Geoapify Places plugin for Eliza",
    actions: [getCurrentEvents, getRestaurants],
    evaluators: [],
    providers: [],
};
export default geoapifyPlacesPlugin;
