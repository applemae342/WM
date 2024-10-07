import { EmailIcon } from "@/components/heroIcons/Icons";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
    };

    return (
        <div>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8 border p-10 bg-white rounded-lg shadow-md">
                    <h2 className="mt-6 text-center text-2xl  text-gray-900">Forgot Password?</h2>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                        <div className="text-center text-gray-600 text-sm font-semibold">
                            <Link href="/sign_in_page" className="text-indigo-600">
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
