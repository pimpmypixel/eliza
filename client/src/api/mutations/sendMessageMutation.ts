import type { CustomMutationResult } from "../types";

import { useMutation } from "@tanstack/react-query";
import { ROUTES } from "../routes";
import { SetStateAction } from "react";

export type TextResponse = {
    context: string;
    text: string;
    user: string;
};

type SendMessageMutationProps = {
    text: string;
    agentId: string;
    context: string;
};

type Props = Required<{
    setMessages: (value: SetStateAction<TextResponse[]>) => void;
}>;

export const useSendMessageMutation = ({
    setMessages,
}: Props): CustomMutationResult<TextResponse[], SendMessageMutationProps> => {
    const mutation = useMutation({
        mutationFn: async ({
            context,
            text,
            agentId,
        }: SendMessageMutationProps) => {
            const formData = new FormData();
            formData.append("text", context + text);
            formData.append("userId", "user");
            formData.append("roomId", `default-room-${agentId}`);

            const res = await fetch(ROUTES.sendMessage(agentId), {
                method: "POST",
                body: formData,
            });

            return res.json() as Promise<TextResponse[]>;
        },
        onSuccess: (data) => {
            setMessages((prev) => [...prev, ...data]);
        },
        onError: (error) => {
            console.error("[useSendMessageMutation]:", error);
        },
    });

    return mutation;
};
