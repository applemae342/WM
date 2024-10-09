import React from "react";

const Footer = () => {
    return (
        <footer className="bg-[#1F4F7A] text-white text-center py-4">
            <div className="container mx-auto px-4">
                <p className="text-base md:text-lg"> {/* Increased font size for a more formal look */}
                    &copy; 2024 Your Website. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
