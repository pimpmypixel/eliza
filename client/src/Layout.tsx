import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


export default function Layout() {
    return (
        <header>
            <SignedOut>
                <SignInButton />
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