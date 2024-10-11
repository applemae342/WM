import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { UserIcon, LockClosed } from "@/components/heroIcons/Icons";
import axios from "axios";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/API/login", { username, password });
            if (response.status === 200) {
                const { role } = response.data.user;
                switch (role) {
                    case "admin":
                        router.push("/dashboard/AdminDashboard");
                        break;
                    case "resident":
                        router.push("/dashboard/ResidentsDashboard");
                        break;
                    case "collector":
                        router.push("/dashboard/CollectorDashboard");
                        break;
                    default:
                        alert("Access denied. Invalid role.");
                }
            } else {
                alert("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
            <Navbar />
            {/* Adding Circular Backgrounds */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0" />

            <div className="flex justify-center items-center relative z-10 mt-20"> {/* Added mt-8 for top margin */}
                {/* Left Side: Sign-in Form */}
                <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-xl">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
                        Please Sign in Your Account.
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UserIcon className="text-gray-500" />
                            </span>
                            <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                            <input
                                type="text"
                                id="username"
                                name="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-12 pr-20 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Username"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LockClosed className="text-gray-500" />
                            </span>
                            <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Password"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="text-center">
                            <Link href="/forgot_password" className="text-sm text-blue-600 hover:underline">
                                Forgot your password?
                            </Link>
                        </div>

                        {/* Sign-In Button */}
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#2E8ECA] text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            SIGN IN
                        </button>
                    </form>

                    {/* Sign Up Section */}
                    <div className="text-sm text-center mt-4">
                        <p className="text-gray-600 inline">Don't have an account? </p>
                        <Link href="/GetStarted" className="font-medium text-indigo-600 hover:text-indigo-500 inline">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
