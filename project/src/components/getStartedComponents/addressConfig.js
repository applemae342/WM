import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressConfig = ({ onBackClick2 }) => {
    const [address, setAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [accountDetails, setAccountDetails] = useState({});

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await axios.get("http://localhost:8000/API/Route/getAll");
                setRoutes(response.data);
            } catch (error) {
                setError("Failed to fetch routes. Please try again later.");
            }
        };

        fetchRoutes();

        const storedAccountDetails = JSON.parse(localStorage.getItem("accountDetails"));
        if (storedAccountDetails) {
            setAccountDetails(storedAccountDetails);
            setEmail(storedAccountDetails.username);
        }
    }, []);

    const handleFinishClick = async () => {
        if (!address || !contactNumber || !email) {
            setError("Please fill in all fields.");
            return;
        }
        setError("");

        const userData = {
            firstname: accountDetails.firstname,
            lastname: accountDetails.lastname,
            address,
            contactNumber,
            username: accountDetails.username,
            email,
            password: accountDetails.password,
            role: "resident",
        };

        localStorage.setItem("userData", JSON.stringify(userData));

        try {
            const response = await axios.post("http://localhost:8000/API/register", userData);
            setShowModal(true);
        } catch (error) {
            setError("Registration failed. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 p-6">
            <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 transition-transform transform hover:scale-105 duration-300">
                <p className="text-3xl font-bold text-gray-800 mb-6 text-center">Address Configuration</p>
                <form className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="font-semibold text-gray-700" htmlFor="address">
                            Address
                        </label>
                        <input
                            id="address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter your address"
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
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter contact number"
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
                            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter your email"
                        />
                    </div>

                    {error && <p className="text-red-500 font-semibold">{error}</p>}

                    <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-4 sm:space-y-0">
                        <button
                            type="button"
                            onClick={onBackClick2}
                            className="bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-200 w-full sm:w-auto"
                        >
                            Back
                        </button>
                        <button
                            type="button"
                            className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
                            onClick={handleFinishClick}
                        >
                            Finish
                        </button>
                    </div>
                </form>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Success!</h3>
                        <p className="text-gray-600 mb-6">Your address configuration is complete.</p>
                        <div className="flex justify-center">
                            <a href="/sign_in_page">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Close
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddressConfig;
