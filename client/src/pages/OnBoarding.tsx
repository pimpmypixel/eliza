import { FAQ } from "../components/FAQ";
import { Footer } from "../components/Footer";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "../components/Newsletter";
import { ScrollToTop } from "../components/ScrollToTop";
import "../css/App.css";
import TripWizard from "@/components/TripWizard";

function OnBoarding() {
    return (
        <>
            <Navbar />
            <TripWizard />
            <Newsletter />
            <FAQ />
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default OnBoarding;