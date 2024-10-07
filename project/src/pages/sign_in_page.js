import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router"; // Import useRouter for navigation
import Navbar from "@/components/Navbar";
import { LockClosed } from "@/components/heroIcons/Icons";
import axios from "axios"; // Import axios for making HTTP requests

const SignIn = () => {
    const [username, setUsername] = useState(""); // State for username
    const [password, setPassword] = useState(""); // State for password
    const router = useRouter(); // Initialize useRouter

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        console.log("Username:", username); // Log the username for debugging
        console.log("Password:", password); // Log the password for debugging

        try {
            // Make POST request to your login API
            const response = await axios.post("http://localhost:8000/API/login", {
                username, // Send the username
                password, // Send the password
            });

            // Check the response and redirect based on the user's role
            if (response.status === 200) {
                const { role } = response.data.user; // Extract role from the response
                console.log("User role:", role); // Log the role for debugging

                // Redirect based on the user's role
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
            // Handle errors from the API call
            console.error("Login failed:", error.response ? error.response.data : error.message);
            alert("Login failed. Please check your credentials and try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
                    <div>
                        <h2 className="mt-6 text-center text-2xl text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-2" onSubmit={handleSubmit}>
                        <div>
                            <div className="relative">
                                <div className="flex items-center">
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="username"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)} // Update username
                                        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Username"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <div className="flex items-center">
                                    <LockClosed className="h-6 w-6 text-gray-400" />
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} // Update password
                                        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit" // Ensure this button submits the form
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
