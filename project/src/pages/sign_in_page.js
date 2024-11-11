import React, { useState } from "react";
import { useRouter } from "next/router";
import SignInNavbar from "../components/SignInNavbar"; // Adjust the path as needed
import { UserIcon, LockClosed } from "@/components/heroIcons/Icons";
import axios from "axios";

const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isTruckFormVisible, setIsTruckFormVisible] = useState(false); // State to toggle forms
    const router = useRouter();

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const apiUrl = isTruckFormVisible 
            ? "http://localhost:8000/API/loginTruck/login" 
            : "http://localhost:8000/API/login";

        const response = await axios.post(apiUrl, { username, password });

        if (response.status === 200) {
            if (isTruckFormVisible) {
                const {
                    truckId,
                    plateNumber,
                    username: truckUsername,
                    description,
                    password: truckPassword,
                    routesID
                } = response.data.truck;

                // Store truck credentials in localStorage
                localStorage.setItem("truckId", truckId);
                localStorage.setItem("plateNumber", plateNumber);
                localStorage.setItem("truckUsername", truckUsername);
                localStorage.setItem("description", description);
                localStorage.setItem("password", truckPassword);
                localStorage.setItem("routesID", routesID);

                // Debugging logs for truck credentials
                console.log("Stored Truck Credentials:");
                console.log("Truck ID:", truckId);
                console.log("Plate Number:", plateNumber);
                console.log("Truck Username:", truckUsername);
                console.log("Description:", description);
                console.log("Password:", truckPassword);
                console.log("Routes ID:", routesID);

                router.push("/dashboard/CollectorDashboard");
            } else {
                const { userID, role, username: loggedUsername } = response.data.user;
                // Store user credentials in localStorage
                localStorage.setItem("userID", userID);
                localStorage.setItem("role", role);
                localStorage.setItem("username", loggedUsername);

                // Debugging logs for user credentials
                console.log("Stored User Credentials:");
                console.log("User ID:", userID);
                console.log("Role:", role);
                console.log("Username:", loggedUsername);

                // Redirect based on role
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
            }
        } else {
            alert("Login failed. Please check your credentials and try again.");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials and try again.");
    }
};


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
            <Navbar />
            {/* Adding Circular Backgrounds */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0" />

            <div className="flex justify-center items-center relative z-10 mt-20">
                <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-xl">
                    <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Please Sign in Your Account.</h2>

                    {!isTruckFormVisible && (
                        <div className="text-center mb-4">
                            <button
                                onClick={() => setIsTruckFormVisible(true)}
                                className="text-blue-600 hover:underline"
                            >
                                Click here to login with Truck credentials
                            </button>
                        </div>
                    )}

                    {!isTruckFormVisible && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="text-gray-500" />
                                </span>
                                <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-12 pr-20 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockClosed className="text-gray-500" />
                                </span>
                                <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-[#2E8ECA] text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                SIGN IN
                            </button>
                        </form>
                    )}

                    {isTruckFormVisible && (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <UserIcon className="text-gray-500" />
                                    </span>
                                    <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-12 pr-20 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <LockClosed className="text-gray-500" />
                                    </span>
                                    <span className="absolute inset-y-0 left-10 w-[2px] bg-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#2E8ECA] text-white font-bold text-lg rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    SIGN IN
                                </button>
                            </form>
                            {/* Back to User Form Button */}
                            <div className="text-center mt-4">
                                <button
                                    onClick={() => setIsTruckFormVisible(false)}
                                    className="text-blue-600 hover:underline"
                                >
                                    Back to User Login
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
