import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function Layout() {
    return (
        <header className="min-h-screen flex flex-col justify-center items-center">
            <SignedOut>
                <div className="flex min-h-screen justify-center items-center">
                    <img className="w-1/4 m-4" src="/logo.png" />
                    <SignInButton>
                        <img src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_lg.svg" alt="Google" />
                    </SignInButton>
                </div>
            </SignedOut>
            <SignedIn>
                <Outlet />
            </SignedIn>
        </header>
    );
}

{/* <SidebarProvider>
            <AppSidebar />
        </SidebarProvider> */}