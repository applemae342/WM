import SignInNavbar from "@/components/SignInNavbar";
import React, { useState } from "react";

const EnterOtp = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleChange = (e, index) => {
        let value = e.target.value;

        if (value.length === 1) {
            otp[index] = value;
            setOtp([...otp]);
            if (index < 5) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        } else {
            otp[index] = "";
            setOtp([...otp]);
            if (index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Entered OTP: ", otp.join(""));
        // Handle OTP verification logic here
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

                        {/* Verify OTP Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#2E8ECA] text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Verify OTP
                            </button>
                        </div>

                        {/* Resend OTP */}
                        <div className="text-center">
                            <button
                                className="text-sm text-blue-600 hover:underline"
                                onClick={() => alert("Resend OTP feature")}
                            >
                                Resend OTP
                            </button>
                        </div>

                        {/* Back Button */}
                        <div className="text-center mt-4">
                            <button
                                onClick={() => window.history.back()}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EnterOtp;
