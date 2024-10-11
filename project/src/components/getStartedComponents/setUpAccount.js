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
        <div className="flex flex-col items-center justify-center h-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-800 mb-6">Setup Your Account</p>
            <form className="w-full max-w-md space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="firstname">
                        First Name
                    </label>
                    <input
                        id="firstname"
                        type="text"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your First Name"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="lastname">
                        Last Name
                    </label>
                    <input
                        id="lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Last Name"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="username">
                        User Name
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your User Name"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Password"
                    />
                </div>
                {error && <p className="text-red-500 font-semibold">{error}</p>}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={onBackClick}
                        className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                        onClick={handleNextClick}
                    >
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SetupAccount;