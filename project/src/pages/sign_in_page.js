import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import { LockClosed } from "@/components/heroIcons/Icons";
import axios from "axios";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/API/login", {
                username,
                password,
            });
            console.log(response)

            if (response.status === 200) {
                const { userID, username, routesID, role } = response.data.user;

                // Store user details in localStorage (avoid storing sensitive data like password)
                localStorage.setItem("userID", userID);
                localStorage.setItem("username", username);
                localStorage.setItem("routesID", routesID);
                localStorage.setItem("role", role);

                // Redirect based on user role
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
                        console.error("Invalid role");
                        alert("Access denied. Invalid role.");
                }
            } else {
                alert("Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            console.error("Login failed:", error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="mt-6 text-center text-2xl text-gray-900">Sign in to your account</h2>
                    <form className="mt-8 space-y-2" onSubmit={handleSubmit}>
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <div className="relative">
                                <LockClosed className="h-6 w-6 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>
                    <div className="text-sm text-center mt-4">
                        <Link href="/forgot_password" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Forgot your password?
                        </Link>
                    </div>
                    <div className="text-sm text-center mt-4">
                        <p className="text-gray-600">Don't have an account?</p>
                        <Link href="/GetStarted" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
