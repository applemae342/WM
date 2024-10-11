import React, { useState } from "react";
import axios from "axios";
import router from "express/lib/router";

// Registration form component
const Registration = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    contactNumber: "",
    email: "",
    address: "",
    role: "resident",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(""); // Reset success message
    try {
      const response = await axios.post(
        "http://localhost:8000/API/register",
        formData
      );
      console.log("Response:", response.data);
      // Set success message and reset form
      setSuccess("Registration successful! You can now log in.");
      setFormData({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        contactNumber: "",
        email: "",
        address: "",
        role: "resident",
      });
   // Redirect to the sign-in page after a successful registration
   setTimeout(() => {
    router.push("/sign_in_page") // Redirect to the sign-in page
  }, 2000); // Optional delay to show success message
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <div
      className="absolute inset-0 bg-gray-400 flex justify-center items-center"
      style={{
        backgroundColor: "rgba(109, 112, 117, 0.96)",
        zIndex: 999,
        pointerEvents: "auto",
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
          Welcome residents of Brgy. Luz!
        </h2>
        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="firstname"
            type="text"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            required
          />
          <input
            name="lastname"
            type="text"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            required
          />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            required
          />
          <input
            name="contactNumber"
            type="text"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full mb-2 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
          />
          <input
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            className="block w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
        {success && (
          <p className="text-green-600 mt-2 text-center font-semibold">
            {success}
          </p>
        )}
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Registration;
