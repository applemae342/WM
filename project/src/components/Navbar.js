import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ homeTitle, aboutTitle, contactTitle }) => {
    const [activeLink, setActiveLink] = useState("home");

    const handleScroll = () => {
        const homeSection = document.getElementById("home");
        const aboutSection = document.getElementById("about");
        const contactSection = document.getElementById("contact");
        const scrollPosition = window.scrollY + 200;

        if (contactSection && scrollPosition >= contactSection.offsetTop && scrollPosition < contactSection.offsetTop + contactSection.offsetHeight) {
            setActiveLink("contact");
        } else if (aboutSection && scrollPosition >= aboutSection.offsetTop && scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight) {
            setActiveLink("about");
        } else {
            setActiveLink("home");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="fixed top-0 w-full bg-gray-50 shadow-md z-50 font-sans">
            <div className="flex items-center justify-start h-16 px-0"> {/* Removed padding for left alignment */}
                <Link href="/" passHref>
                    <img src="/images/system_logo.png" alt="Logo" className="h-28 w-28" /> {/* Increased logo size */}
                </Link>
                <Link href="/" passHref className="text-2xl -ml-6 font-semibold text-gray-800" style={{ fontSize: '18px' }}> {/* Reduced margin for tighter alignment */}
                    Waste Management Tracking System
                </Link>

                <div className="hidden md:flex space-x-8 ml-auto"> {/* Right-aligned links */}
                    <Link href="#home" passHref>
                        <span className={`cursor-pointer ${activeLink === "home" ? "text-blue-500" : "text-black"} text-lg`}>
                            {homeTitle}
                        </span>
                    </Link>
                    <Link href="#about" passHref>
                        <span className={`cursor-pointer ${activeLink === "about" ? "text-blue-500" : "text-black"} text-lg`}>
                            {aboutTitle}
                        </span>
                    </Link>
                    <Link href="#contact" passHref>
                        <span className={`cursor-pointer ${activeLink === "contact" ? "text-blue-500" : "text-black"} text-lg`}>
                            {contactTitle}
                        </span>
                    </Link>
                    <Link href="/sign_in_page" passHref>
                        <span className={`cursor-pointer ${activeLink === "signIn" ? "text-blue-500" : "text-black"} text-lg`}>
                            Sign In
                        </span>
                    </Link>
                </div>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900 focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-gray-100">
                    <div className="flex flex-col space-y-4 py-4 px-8">
                        <Link href="#home" passHref>
                            <span className={`cursor-pointer ${activeLink === "home" ? "text-blue-500" : "text-black"} text-lg`}>
                                {homeTitle}
                            </span>
                        </Link>
                        <Link href="#about" passHref>
                            <span className={`cursor-pointer ${activeLink === "about" ? "text-blue-500" : "text-black"} text-lg`}>
                                {aboutTitle}
                            </span>
                        </Link>
                        <Link href="#contact" passHref>
                            <span className={`cursor-pointer ${activeLink === "contact" ? "text-blue-500" : "text-black"} text-lg`}>
                                {contactTitle}
                            </span>
                        </Link>
                        <Link href="/sign_in_page" passHref>
                            <span className={`cursor-pointer ${activeLink === "signIn" ? "text-blue-500" : "text-black"} text-lg`}>
                                Sign In
                            </span>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
