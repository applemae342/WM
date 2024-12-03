import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SignInNavbar from "@/components/SignInNavbar";

const EnterOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);  // To track resend OTP loading state
    const router = useRouter();

    // Retrieve email from sessionStorage
    const email = typeof window !== "undefined" ? sessionStorage.getItem("email") : null;

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
        const newOtp = [...otp];
        newOtp[index] = value;

        setOtp(newOtp);

        // Focus management
        if (value.length === 1 && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        } else if (!value && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        const otpEntered = otp.join("");

        if (otpEntered.length !== 6) {
            setError("Please enter the full 6-digit OTP.");
            setIsLoading(false);
            return;
        }

        if (!email) {
            setError("Email is missing. Redirecting to forgot password...");
            setTimeout(() => router.push("/ForgotPassword"), 2000); // Redirect to ForgotPassword page
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/API/otp/verify-otp", {
                email,
                otp: otpEntered,
            });

            if (response.data.success) {
                router.push("/changePassword"); // Redirect to changePassword page
            } else {
                setError(response.data.error || "Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setError(
                err.response?.data?.error ||
                "An error occurred while verifying OTP. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    // Function to resend the OTP
    const handleResendOtp = async () => {
        if (!email) {
            setError("Email is missing. Please start the process again.");
            return;
        }

        setResendLoading(true);
        setError(""); // Clear any previous error

        try {
            const response = await axios.post("http://localhost:8000/API/otp/send-email", {
                email,
            });

            if (response.data.success) {
                setError("OTP sent again. Please check your email.");
            } else {
                setError(response.data.error || "Failed to resend OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error resending OTP:", err);
            setError("An error occurred while resending OTP. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
            <SignInNavbar />
            <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Enter OTP</h2>
                <p className="text-center text-gray-600 mb-6">
                    Please enter the OTP sent to your registered email address.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* OTP Input Fields */}
                    <div className="flex justify-between space-x-2">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                value={digit}
                                maxLength={1}
                                onChange={(e) => handleChange(e, index)}
                                className="w-12 h-12 text-center text-xl font-semibold bg-gray-200 text-gray-900 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                autoFocus={index === 0}
                            />
                        ))}
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
                            disabled={isLoading}
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </div>
                </form>

                {/* Resend OTP Button */}
                <div className="text-center mt-4">
                    <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={handleResendOtp}
                        disabled={resendLoading || isLoading}  // Disable button if already sending OTP or verifying
                    >
                        {resendLoading ? "Resending OTP..." : "Resend OTP"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterOtp;
