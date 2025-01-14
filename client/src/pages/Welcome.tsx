import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "../components/Newsletter";
import { ScrollToTop } from "../components/ScrollToTop";
import { WelcomeOptions } from "../components/WelcomeOptions";
import "../css/App.css";

function Welcome() {
    return (
        <>
            <Navbar />
            <WelcomeOptions />
            <Newsletter />
            <FAQ />
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default Welcome;