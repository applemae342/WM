import "@/styles/globals.css";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
    useEffect(() => {
        AOS.init({ duration: 1000 }); // Initialize AOS with a duration
    }, []);
    return <Component {...pageProps} />;
}
