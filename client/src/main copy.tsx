import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import { Routes, Route } from 'react-router-dom'
// import { RouterProvider } from "react-router-dom";
// import { router } from "./lib/router";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import FrontPage from "./pages/FrontPage";

const PUBLISHABLE_KEY = 'pk_test_cHJvdmVuLWFpcmVkYWxlLTIyLmNsZXJrLmFjY291bnRzLmRldiQ'//import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <Routes>
                        <Route path="/" element={<FrontPage />} />
                    </Routes>
                </ThemeProvider>
            </QueryClientProvider>
        </ClerkProvider>
    </React.StrictMode>
);
