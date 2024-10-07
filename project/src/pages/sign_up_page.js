import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Link from "next/link";
import { ContactIcon, EmailIcon, LockClosed, UserIcon } from "@/components/heroIcons/Icons";

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Contact:", contact);
        console.log("Password:", password);
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl text-gray-900 text-center mb-4">Create an Account</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="flex items-center">
                                <UserIcon className="h-6 w-6 text-gray-400" />
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="User Name"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex items-center">
                                <EmailIcon className="h-6 w-6 text-gray-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Email"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex items-center">
                                <ContactIcon className="h-6 w-6 text-gray-400" />
                                <input
                                    id="contact"
                                    name="contact"
                                    type="text"
                                    autoComplete="contact"
                                    required
                                    value={email}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Contact Number"
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="flex items-center">
                                <LockClosed className="h-6 w-6 text-gray-400" />
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    value={email}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                    <div className="text-center text-sm mt-4">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link href="/sign_in_page" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
