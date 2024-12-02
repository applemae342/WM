import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // Make sure axios is installed in your project
import { EmailIcon } from "@/components/heroIcons/Icons";
import SignInNavbar from "@/components/SignInNavbar";
import Link from "next/link";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState(""); // State for error message
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Email:", email);

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError("Email is required.");
            return;
        }
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        setError(""); // Clear error if email is valid

        try {
            const response = await axios.post("http://localhost:8000/API/otp/send-email", { email });

            console.log('Backend Response:', response.data);

            if (response.data.success) {
                router.push("/EnterOtp");
            } else {
                // Check for specific error messages from the backend
                if (response.data.error === "Email does not exist") {
                    setError("This email does not match our records.");
                } else if (response.data.error === "The email address is not valid.") {
                    setError("Please enter a valid email address.");
                } else {
                    setError(response.data.error || "Failed to send OTP. Please try again.");
                }
            }
        } catch (err) {
            console.error("Error occurred:", err);
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
            <SignInNavbar />
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0" />

            <div className="flex justify-center items-center relative z-10 mt-20">
                <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-xl">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Forgot Password?</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <EmailIcon className="text-gray-500" />
                            </span>
                            <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-20 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Email"
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center mt-2">
                                {error}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#2E8ECA] text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="text-center">
                            <Link href="/sign_in_page" className="text-sm text-blue-600 hover:underline">
                                Back to Sign In Page
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
