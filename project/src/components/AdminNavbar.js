import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const AdminNavBar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  // Fetch the username from localStorage when the component mounts
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Attempting to log out..."); // Debugging

      // Send a POST request to the /logout API
      const response = await fetch("http://localhost:8000/API/login/logout", {
        method: "POST", // HTTP method for logging out
        headers: {
          "Content-Type": "application/json",
        },
      });

      // If the logout is successful
      if (response.ok) {
        console.log("Logout successful!"); // Debugging

        // Clear session and local storage
        sessionStorage.removeItem("userID");
        sessionStorage.removeItem("username");
        localStorage.removeItem("userID");
        localStorage.removeItem("username");

        // Redirect to sign-in page
        router.push("/sign_in_page");
      } else {
        console.error("Logout failed:", response); // Debugging
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-50 shadow-md z-50 font-sans">
      <div className="flex items-center justify-start h-16 px-0">
        <div className="flex items-center">
          <Link href="/dashboard/AdminDashboard" passHref>
            <img
              src="/images/system_logo.png"
              alt="Logo"
              className="h-28 w-28"
            />
          </Link>
          <Link href="/" passHref className="text-2xl -ml-6 font-semibold text-gray-800" style={{ fontSize: "18px" }}>
            Waste Management Tracking System
          </Link>
        </div>

        <div className="relative mr-4 ml-auto flex items-center">
          <h1 className="text-lg font-bold text-black mr-5">{username || "Admin"}</h1>
          <img
            src="/images/user.png"
            alt="Profile"
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-12 w-48 top-0 bg-white border border-gray-200 rounded-lg shadow-lg text-black p-2">
              <ul>
                <li>
                  <Link href="/profile">My Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Log Out</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavBar;
