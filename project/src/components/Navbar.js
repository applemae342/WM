import { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = ({ homeTitle, aboutTitle, contactTitle }) => {
  const [activeLink, setActiveLink] = useState("home"); // State to track active link

  const handleScroll = () => {
    const homeSection = document.getElementById("home");
    const aboutSection = document.getElementById("about");
    const contactSection = document.getElementById("contact");
    const scrollPosition = window.scrollY + 200; // Adjusted scroll position for accuracy

    if (
      contactSection &&
      scrollPosition >= contactSection.offsetTop &&
      scrollPosition < contactSection.offsetTop + contactSection.offsetHeight
    ) {
      setActiveLink("contact");
    } else if (
      aboutSection &&
      scrollPosition >= aboutSection.offsetTop &&
      scrollPosition < aboutSection.offsetTop + aboutSection.offsetHeight
    ) {
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
    <nav className="fixed top-0 w-full bg-white shadow-lg z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex items-center space-x-4">
          <a href="/">
            <img
              src="/images/system_logo.png"
              alt="Logo"
              className="h-20 w-full"
            />
          </a>
          <Link href="/" passHref className="text-2xl font-semibold">
          Waste Management Tracking System
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="#home" passHref className={`text-${activeLink === "home" ? "blue" : "black"}-500`}>
          {homeTitle}
          </Link>
          <Link href="#about" passHref className={`text-${activeLink === "about" ? "blue" : "black"}-500`}>
           {aboutTitle}
          </Link>
          <Link href="#contact" passHref className={`text-${activeLink === "contact" ? "blue" : "black"}-500`}>
          {contactTitle}
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="block text-gray-500 hover:text-gray-900 focus:text-gray-900 focus:outline-none"
          >
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5h18v2H3V5zm0 6h18v2H3v-2zm0 6h18v2H3v-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col space-y-4 py-4 px-8 bg-gray-100">
            <Link href="#home" passHref>
              <a className={`text-${activeLink === "home" ? "blue" : "black"}-500`}>{homeTitle}</a>
            </Link>
            <Link href="#about" passHref>
              <a className={`text-${activeLink === "about" ? "blue" : "black"}-500`}>{aboutTitle}</a>
            </Link>
            <Link href="#contact" passHref>
              <a className={`text-${activeLink === "contact" ? "blue" : "black"}-500`}>{contactTitle}</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
