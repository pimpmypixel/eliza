import { PlacesResponse } from "./types";

const BASE_URL = "https://api.geoapify.com/v2/places?";

export const createPlacesService = (apiKey: string) => {
    const getPlaces = async (
        location: string,
        categories: string[],
        conditions: string[]
    ): Promise<PlacesResponse> => {
        if (!apiKey) {
            throw new Error("Invalid parameters");
        }

        try {
            // https://api.geoapify.com/v2/places?categories=entertainment.culture,natural.forest&conditions=dogs.yes&filter=circle:12.485411,55.789063,5000&bias=proximity:12.485411,55.789063&lang=en&limit=20&apiKey=YOUR_API_KEY

            const url = new URL(BASE_URL);
            url.searchParams.append("categories", categories.join(","));
            url.searchParams.append("conditions", conditions.join(","));
            url.searchParams.append("filter", 'circle:' + location);
            url.searchParams.append("bias", 'proximity:' + location);
            url.searchParams.append("lang", "en");
            url.searchParams.append("limit", "20");
            url.searchParams.append("apiKey", apiKey);

            const response = await fetch(url);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error?.message || response.statusText);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error("Geoapify API Error:", error.message);
            throw error;
        }
    };

    return { getPlaces };
};
