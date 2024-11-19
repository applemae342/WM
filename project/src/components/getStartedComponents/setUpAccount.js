import React, { useState } from "react";

const SetupAccount = ({ onNextClick, onBackClick }) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleNextClick = () => {
        if (!firstname || !lastname || !username || !password) {
            setError("Please fill in all fields.");
            return;
        }

        // Save data to localStorage
        localStorage.setItem("accountDetails", JSON.stringify({ firstname, lastname, username, password }));

        setError("");
        onNextClick();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-6 px-4">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 transition-transform transform hover:scale-105 duration-300">
                <p className="text-3xl font-bold text-gray-800 mb-6 text-center">Setup Your Account</p>
                <form className="space-y-4">
                    {/* First Name */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold text-gray-700" htmlFor="firstname">
                            First Name
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter your First Name"
                        />
                    </div>

                    {/* Last Name */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold text-gray-700" htmlFor="lastname">
                            Last Name
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter your Last Name"
                        />
                    </div>

                    {/* User Name */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold text-gray-700" htmlFor="username">
                            User Name
                        </label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter your User Name"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter your Password"
                        />
                    </div>

                    {/* Error Message */}
                    {error && <p className="text-red-500 font-semibold">{error}</p>}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0">
                        <button
                            type="button"
                            onClick={onBackClick}
                            className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-200 w-full sm:w-auto"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetupAccount;
