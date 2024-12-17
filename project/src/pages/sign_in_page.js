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
  const [resetPassword, setResetPassword] = useState(false); // State for modal visibility
  const [resetPassword1, setResetPassword1] = useState(false); // State for modal visibility

  const [error, setError] = useState(""); // State for error message
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword1, setConfirmPassword1] = useState("");
  const [newPassword1, setNewPassword1] = useState("");

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
                truckID,
                plateNumber,
                username: truckUsername,
                description,
                password: truckPassword,
                routesID,
                reset,
            } = response.data.truck;
            console.log(response)
    
            // Store truck credentials in localStorage
            localStorage.setItem("truckId", truckID);
            localStorage.setItem("plateNumber", plateNumber);
            localStorage.setItem("truckUsername", truckUsername);
            localStorage.setItem("description", description);
            localStorage.setItem("password", truckPassword);
            localStorage.setItem("routesID", routesID);
            localStorage.setItem("reset", reset);
    
            // Optionally, store the session data in memory (this may not be required if you already have session tracking server-side)
            // Example: Set session storage or directly from the server if necessary
            sessionStorage.setItem("truckSession", JSON.stringify({
                truckID,
                truckUsername,
                plateNumber,
                description,
                routesID,
            }));
    
            
                router.push("/dashboard/CollectorDashboard");
            
        } else {
            const {
                userID,
                username: loggedUsername,
                reset,
              } = response.data.user;
              
              // Store user credentials in localStorage and sessionStorage
              localStorage.setItem("userID", userID);
              localStorage.setItem("username", loggedUsername);
              sessionStorage.setItem("userID", userID);  // Add sessionStorage for userID
              sessionStorage.setItem("username", loggedUsername);  // Add sessionStorage for username
              
              console.log(userID + "nenia");
              
              // If reset is "no", show the reset password modal
              if (reset === "no") {
                setResetPassword(true); // Trigger modal
                console.log("jsbdhsbdhsbd");
              } else {
                router.push("/dashboard/AdminDashboard");
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

  const handleCloseModal = () => {
    setResetPassword(false); // Close the modal
  };
  const handleCloseModal1 = () => {
    setResetPassword1(false); // Close the modal
  };

  const handleResetPassword = async () => {
    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    try {
      // Clear any previous errors
      setError("");

      // Retrieve userID and username from localStorage
      const userID = localStorage.getItem("userID");
      const username = localStorage.getItem("username"); // Optional

      if (!userID) {
        setError("User ID not found.");
        return;
      }

      // API call to update password
      const response = await axios.put(
        `http://localhost:8000/API/users/updatepassword/${userID}`,
        { password: confirmPassword, reset: "yes" }
      );

      if (response.status === 200) {
        // Successfully reset the password
        console.log("Password reset successfully");

        // Update the reset value to "yes" in localStorage
        localStorage.setItem("reset", "yes");

        // Close the modal
        setResetPassword(false);

        // Redirect the user to the dashboard
        router.push("/dashboard/AdminDashboard");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setError(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };
  const handleResetPassword1 = async () => {
    // Check if the passwords match
    if (newPassword1 !== confirmPassword1) {
      setError("The passwords do not match.");
      return;
    }

    try {
      // Clear any previous errors
      setError("");

      // Retrieve userID and username from localStorage
      const truckId = localStorage.getItem("truckId");
      const truckUsername = localStorage.getItem("truckUsername "); // Optional

      if (!truckId) {
        setError("User ID not found.");
        return;
      }

      // API call to update password
      const response = await axios.put(
        `http://localhost:8000/API/RegisterTruck/update/${truckId}`,
        { password: confirmPassword1, reset: "yes" }
    
      );
      console.log(confirmPassword1+"sbdhsgdshd");

      if (response.status === 200) {
        // Successfully reset the password
        console.log("Password reset successfully");

        // Update the reset value to "yes" in localStorage
        localStorage.setItem("reset", "yes");

        // Close the modal
        setResetPassword(false);

        // Redirect the user to the dashboard
        router.push("/dashboard/CollectorDashboard");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setError(
        "An error occurred while resetting the password. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 relative font-sans">
      <SignInNavbar />
      {/* Circular Backgrounds */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 z-0" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-2xl opacity-70 z-0" />

      <div className="flex justify-center items-center relative z-10 mt-20">
        <div className="bg-white rounded-md shadow-lg p-8 w-full max-w-xl">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Please Sign in Your Account.
          </h2>

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

          {/* User Login Form */}
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

      {/* Modal for Reset Password */}
      {resetPassword && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg z-50">
            <h3 className="text-lg font-semibold">Reset Your Password</h3>
            <p className="mt-2">Please reset your password to continue.</p>

            {/* New Password Input */}
            <div className="mt-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your new password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your new password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

            {/* Reset Password Button */}
            <div className="mt-4">
              <button
                onClick={handleResetPassword}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>

            {/* Close Modal Button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleCloseModal}
                className="text-blue-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
       {/* Modal for Reset Password */}
       {resetPassword1 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-96 shadow-lg z-50">
            <h3 className="text-lg font-semibold">Reset Yourrrrrrrrr Password</h3>
            <p className="mt-2">Please reset your password to continue.</p>

            {/* New Password Input */}
            <div className="mt-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword1}
                onChange={(e) => setNewPassword1(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your new password"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mt-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword1}
                onChange={(e) => setConfirmPassword1(e.target.value)}
                className="w-full mt-2 p-3 bg-gray-200 text-gray-900 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your new password"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}

            {/* Reset Password Button */}
            <div className="mt-4">
              <button
                onClick={handleResetPassword1}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reset Password
              </button>
            </div>

            {/* Close Modal Button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleCloseModal1}
                className="text-blue-600 hover:underline"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
