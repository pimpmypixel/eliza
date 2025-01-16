import { SignedIn } from "@clerk/clerk-react";
import { SignedOut } from "@clerk/clerk-react";
import FrontPage from "./FrontPage";
import Welcome from "./Welcome";
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
