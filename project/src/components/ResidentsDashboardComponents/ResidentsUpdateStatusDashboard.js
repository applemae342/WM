import React, { useState } from "react";

const ResidentsUpdateStatusDashboard = () => {
    const [status, setStatus] = useState("");

    const handleSelectChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateClick = () => {
        // Logic for update action
        console.log("Status updated to:", status);
    };

    const handleCancelClick = () => {
        // Logic for cancel action
        console.log("Update canceled");
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
                    <option value="">Status</option>
                    <option value="1">Option 1</option>
                    <option value="2">Option 2</option>
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
        </div>
    );
};

export default ResidentsUpdateStatusDashboard;
