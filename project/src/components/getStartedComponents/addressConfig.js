import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressConfig = ({ onBackClick2 }) => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [routesId, setRoutesId] = useState(""); // Store selected route ID
  const [routes, setRoutes] = useState([]); // List of routes
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [accountDetails, setAccountDetails] = useState({}); // State to store account details

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/API/Route/getAll"
        );
        console.log("Routes fetched:", response.data); // Log response data
        setRoutes(response.data); // Set fetched routes
      } catch (error) {
        console.error("Error fetching routes:", error);
        setError("Failed to fetch routes. Please try again later.");
      }
    };

    fetchRoutes();

    // Retrieve account details from localStorage
    const storedAccountDetails = JSON.parse(
      localStorage.getItem("accountDetails")
    );
    if (storedAccountDetails) {
      setAccountDetails(storedAccountDetails); // Set account details in state
      setEmail(storedAccountDetails.username); // Set email directly from account details
    }
  }, []);

  const handleFinishClick = async () => {
    // Validate input fields
    if (!address || !contactNumber || !email ) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");

    const userData = {
      firstname: accountDetails.firstname, // Ensure these fields are correctly set
      lastname: accountDetails.lastname,
      address,
      contactNumber,
      username: accountDetails.username, // Or wherever this is coming from
      email,
      password: accountDetails.password, // Ensure this is set, if required
      role: "resident", // or another value if applicable
    };

    localStorage.setItem("userData", JSON.stringify(userData));
    console.log("User Data to be sent:", userData); // Log the user data

    try {
      // Send POST request to register user
      const response = await axios.post(
        "http://localhost:8000/API/register",
        userData
      );
      console.log("Registration successful:", response.data);
      setShowModal(true); // Show confirmation modal
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response ? error.response.data : error.message
      ); // Log error details
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <p className="text-2xl font-bold text-gray-800 mb-6">
        Address Configuration
      </p>
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
          <label
            className="font-semibold text-gray-700"
            htmlFor="contactNumber"
          >
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
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Confirmation</h2>
            <p>Your address configuration is complete.</p>
            
            <a href="/sign_in_page" >
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
            >
              Close
            </button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressConfig;