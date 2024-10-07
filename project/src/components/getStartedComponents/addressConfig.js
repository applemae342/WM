import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressConfig = ({ onBackClick2 }) => {
    const [address, setAddress] = useState("");
    const [location, setLocation] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [routesId, setRoutesId] = useState("");
    const [routes, setRoutes] = useState([]);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/API/Route/getAll");
                setRoutes(response.data);
            } catch (error) {
                console.error("Error fetching routes:", error);
                setError("Failed to fetch routes. Please try again later.");
            }
        };

        fetchRoutes();
        
        // Retrieve account details from localStorage
        const accountDetails = JSON.parse(localStorage.getItem("accountDetails"));
        if (accountDetails) {
            setEmail(accountDetails.username); // Set email to username if that's the intention
        }
    }, []);

    const handleFinishClick = () => {
        if (!address || !location || !contactNumber || !email) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");
        setShowModal(true);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <p className="text-2xl font-bold text-gray-800 mb-6">Address Configuration</p>
            <form className="w-full max-w-md space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="address">
                        Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Address"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="contactNumber">
                        Contact Number
                    </label>
                    <input
                        id="contactNumber"
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter Contact Number"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your Email"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700" htmlFor="routesId">
                        Select Route
                    </label>
                    <select
                        id="routesId"
                        value={routesId}
                        onChange={(e) => setRoutesId(e.target.value)}
                        className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Select a route
                        </option>
                        {routes.map((route) => (
                            <option key={route.routesID} value={route.routesID}>
                                {route.routeName}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <p className="text-red-500 font-semibold">{error}</p>}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-md hover:bg-gray-400 transition-colors duration-300"
                        onClick={onBackClick2}
                    >
                        Back
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-colors duration-300"
                        onClick={handleFinishClick}
                    >
                        Finish
                    </button>
                </div>
            </form>
            {/* Modal for confirmation can be added here if needed */}
        </div>
    );
};

export default AddressConfig;
