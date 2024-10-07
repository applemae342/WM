import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { EmailIcon, LockClosed } from "@/components/heroIcons/Icons";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
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
                                    <EmailIcon className="h-6 w-6 text-gray-400" />
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Email address"
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
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Password"
                                    />
                                </div>
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
                        <Link href="/sign_up_page" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
