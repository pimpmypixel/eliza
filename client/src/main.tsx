import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.tsx";
import "./index.css";

// Initialize theme
const theme = localStorage.getItem("theme") || "system";
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
document.documentElement.classList.add(theme === "system" ? systemTheme : theme);

const PUBLISHABLE_KEY = 'pk_test_cHJvdmVuLWFpcmVkYWxlLTIyLmNsZXJrLmFjY291bnRzLmRldiQ'//import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </ClerkProvider>
    </StrictMode>
);