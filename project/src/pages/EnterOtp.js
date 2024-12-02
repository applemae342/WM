import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import SignInNavbar from "@/components/SignInNavbar";

const EnterOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e, index) => {
        const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only digits
        otp[index] = value;

        setOtp([...otp]);

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

        const { email } = router.query;

        if (!email) {
            setError("Email is missing. Please start the process again.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/API/otp/verify-otp", {
                email,
                otp: otpEntered,
                newPassword: "", // Placeholder for the newPassword field
            });

            if (response.data.success) {
                router.push("/changePassword");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error("Error verifying OTP:", err);
            setError("An error occurred while verifying OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        const { email } = router.query;

        if (!email) {
            setError("Email is missing. Please start the process again.");
            return;
        }

        try {
            await axios.post("http://localhost:8000/API/otp/send-email", { email });
            alert("A new OTP has been sent to your email.");
        } catch (err) {
            console.error("Error resending OTP:", err);
            setError("Failed to resend OTP. Please try again later.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
            <SignInNavbar />
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0" />

            <div className="flex justify-center items-center relative z-10 mt-20">
                <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Enter OTP</h2>
                    <p className="text-center text-gray-600 mb-6">
                        We have sent a one-time password (OTP) to your email. Please enter it below to proceed.
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

                        {/* Resend OTP */}
                        <div className="text-center">
                            <button
                                type="button"
                                className="text-sm text-blue-600 hover:underline"
                                onClick={handleResendOtp}
                            >
                                Resend OTP
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnterOtp;
