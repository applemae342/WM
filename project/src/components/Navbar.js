import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ homeTitle, aboutTitle, contactTitle }) => {
    const [activeLink, setActiveLink] = useState("home"); // State to track active link

    const handleScroll = () => {
        const homeSection = document.getElementById("home");
        const aboutSection = document.getElementById("about");
        const contactSection = document.getElementById("contact");
        const scrollPosition = window.scrollY + 200; // Adjusted scroll position for accuracy

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
        <nav className="fixed top-0 w-full bg-white shadow-md z-50">
            <div className="container mx-auto flex items-center justify-between h-16 px-4">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link href="/" passHref>
                        <img src="/images/system_logo.png" alt="Logo" className="h-24 w-auto mr-4 -ml-8" /> {/* Increased height and left margin */}
                    </Link>
                    <Link href="/" passHref className="text-3xl -ml-8 font-semibold text-gray-800" style={{ fontFamily: 'Georgia, serif', fontSize: '24px' }}> {/* Font size changed to 24px */}
                        Waste Management Tracking System
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex space-x-8 ml-auto">
                    <Link href="#home" passHref>
                        <span className={`cursor-pointer ${activeLink === "home" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                            {homeTitle}
                        </span>
                    </Link>
                    <Link href="#about" passHref>
                        <span className={`cursor-pointer ${activeLink === "about" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                            {aboutTitle}
                        </span>
                    </Link>
                    <Link href="#contact" passHref>
                        <span className={`cursor-pointer ${activeLink === "contact" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                            {contactTitle}
                        </span>
                    </Link>
                    <Link href="/sign_in_page" passHref>
                        <span className={`cursor-pointer ${activeLink === "signIn" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                            Sign In
                        </span>
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-900 focus:outline-none">
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-100">
                    <div className="flex flex-col space-y-4 py-4 px-8">
                        <Link href="#home" passHref>
                            <span className={`cursor-pointer ${activeLink === "home" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                                {homeTitle}
                            </span>
                        </Link>
                        <Link href="#about" passHref>
                            <span className={`cursor-pointer ${activeLink === "about" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                                {aboutTitle}
                            </span>
                        </Link>
                        <Link href="#contact" passHref>
                            <span className={`cursor-pointer ${activeLink === "contact" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
                                {contactTitle}
                            </span>
                        </Link>
                        <Link href="/sign_in_page" passHref>
                            <span className={`cursor-pointer ${activeLink === "signIn" ? "text-blue-500" : "text-black"}`} style={{ fontFamily: 'Georgia, serif', fontSize: '18px' }}>
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
