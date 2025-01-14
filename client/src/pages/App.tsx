import FrontPage from "./Frontpage";
import { SignedIn } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import Welcome from "./Welcome";
import { SettingsProvider } from "@/context/GlobalStateContext";
import "../css/App.css";

function App() {
    return (<>
        <SignedOut>
            <FrontPage />
        </SignedOut>
        <SignedIn>
            {/* <SettingsProvider> */}
            <Welcome />
            {/* </SettingsProvider> */}
        </SignedIn>
    </>
    );
}

export default App;
