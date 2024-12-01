import Link from "next/link";

const SignInNavbar = () => {
    return (
        <nav className="fixed top-0 w-full bg-gray-50 shadow-md z-50 font-sans">
            <div className="flex items-center justify-start h-16 px-0">
                {/* Logo */}
                <Link href="/" passHref>
                    <img src="/images/system_logo.png" alt="Logo" className="h-28 w-28" /> {/* Increased logo size */}
                </Link>
                {/* Title */}
                <Link href="/" passHref>
                    <span className="text-2xl -ml-6 font-semibold text-gray-800" style={{ fontSize: "18px" }}>
                        Waste Management Tracking System
                    </span>
                </Link>
            </div>
        </nav>
    );
};

export default SignInNavbar;
