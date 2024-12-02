import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // Make sure axios is installed
import SignInNavbar from "@/components/SignInNavbar";

const ChangePassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            // Send the new password to the backend
            const response = await axios.post("http://localhost:8000/API/password/change", { password });

            if (response.data.success) {
                setSuccess("Password changed successfully!");
                // Redirect to login page after success
                setTimeout(() => {
                    router.push("/sign_in_page");
                }, 2000);
            } else {
                setError("Failed to change password. Please try again.");
            }
        } catch (err) {
            console.error("Error changing password:", err);
            setError("An error occurred while changing the password. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
            <SignInNavbar />
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0" />

            <div className="flex justify-center items-center relative z-10 mt-20">
                <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-md">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Change Password</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="New Password"
                                className="w-full py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm Password"
                                className="w-full py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center mt-2">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="text-green-600 text-sm text-center mt-2">
                                {success}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#2E8ECA] text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
