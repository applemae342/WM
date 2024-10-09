import React, { useEffect, useState } from "react";

const ResidentsUpdateStatusDashboard = () => {
    const [status, setStatus] = useState("");
    const [userStatus, setUserStatus] = useState(null);
    const userID = localStorage.getItem("userID");

    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                if (userID) {
                    const response = await fetch(`http://localhost:8000/API/Status/getByUserID/${userID}`);
                    if (!response.ok) {
                        throw new Error("Failed to fetch user status");
                    }
                    const data = await response.json();
                    console.log("Fetched user status data:", data);
                    setUserStatus(data);
                    setStatus(data.statusName); // Set initial status for dropdown using statusName
                } else {
                    console.error("No userID found in local storage");
                }
            } catch (error) {
                console.error("Error fetching user status:", error);
            }
        };

        fetchUserStatus();
    }, [userID]);

    const handleSelectChange = (event) => {
        setStatus(event.target.value); // Update the selected status
    };

    const handleUpdateClick = async () => {
        if (!status) {
            console.error("Status is required to update.");
            return; // Prevent update if no status is selected
        }

        try {
            console.log("Updating status to:", status); // Log the selected status
            const response = await fetch(`http://localhost:8000/API/Status/update/${userID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userID, statusName: status }), // Send statusName in the request
            });

            if (!response.ok) {
                const errorText = await response.text(); // Capture error text for debugging
                throw new Error(`Failed to update status: ${errorText}`);
            }

            const updatedStatus = await response.json();
            console.log("Status updated successfully:", updatedStatus);
            setUserStatus(updatedStatus); // Update state with the response
            setStatus(updatedStatus.statusName); // Reflect the updated status
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleCancelClick = () => {
        console.log("Update canceled");
        setStatus(userStatus ? userStatus.statusName : ""); // Reset dropdown to current status if available
    };

    return (
        <div className="p-4 max-w-sm mx-auto">
            <form className="border p-4 rounded-lg shadow-lg">
                <p className="text-lg font-semibold mb-4">Update your Status</p>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Status
                </label>
                <select
                    id="status"
                    value={status}
                    onChange={handleSelectChange}
                    className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm"
                >
                    <option value="">Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="collected">Collected</option>
                </select>
                <div className="mt-4 flex space-x-2">
                    <button
                        type="button"
                        onClick={handleUpdateClick}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelClick}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                </div>
            </form>

            {userStatus && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold">Current Status:</h3>
                    <p className="text-gray-700">{userStatus.statusName}</p>
                </div>
            )}
        </div>
    );
};

export default ResidentsUpdateStatusDashboard;
