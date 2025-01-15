import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const geoapifyEnvSchema = z.object({
    GEOAPIFY_API_KEY: z.string().min(1, "Geoapify API key is required"),
});

export type GeoapifyConfig = z.infer<typeof geoapifyEnvSchema>;

export async function validateGeoapifyConfig(
    runtime: IAgentRuntime
): Promise<GeoapifyConfig> {
    try {
        const config = {
            GEOAPIFY_API_KEY: runtime.getSetting("GEOAPIFY_API_KEY"),
        };

        return geoapifyEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Geoapify configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
