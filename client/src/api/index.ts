export * from "./mutations";
export * from "./queries";

export interface TextResponse {
    text: string;
    user: string;
    context?: string;
    action?: 'CONTINUE' | string;
}
