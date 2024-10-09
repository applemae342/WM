import React, { useState } from "react";

const CollectionHistory = () => {
    // Sample data for places, dates, and times in Cebu with status
    const data = [
        { routeName: "Magellan's Cross", date: "2024-09-10", time: "09:00 AM" },
        { routeName: "Fort San Pedro", date: "2024-09-11", time: "10:30 AM" },
        { routeName: "Taoist Temple", date: "2024-09-12", time: "12:00 PM" },
        { routeName: "SM City Cebu", date: "2024-09-13", time: "02:00 PM" },
        { routeName: "Ayala Center Cebu", date: "2024-09-14", time: "04:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
        { routeName: "Cebu Metropolitan Cathedral", date: "2024-09-15", time: "06:00 PM" },
    ];

    // State for search query
    const [searchQuery, setSearchQuery] = useState("");

    // Filtered data based on search query
    const filteredData = data.filter((item) => item.routeName.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl text-center mb-8 text-gray-800">Collection History</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by place..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[15rem] p-2 border border-gray-300 rounded-md outline-none"
                />
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto">
                    {" "}
                    {/* Set a fixed height and enable vertical scrolling */}
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                        <thead className="bg-gray-200 text-gray-700 uppercase text-sm sticky top-0">
                            {" "}
                            {/* Make header sticky */}
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-300 text-center">Route Name</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-center">Date</th>
                                <th className="px-6 py-3 border-b border-gray-300 text-center">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                                        No results found
                                    </td>
                                </tr>
                            ) : (
                                filteredData.map((item, index) => (
                                    <tr key={index} className={`hover:bg-gray-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                        <td className="px-6 py-4 border-b border-gray-300 text-center">{item.routeName}</td>
                                        <td className="px-6 py-4 border-b border-gray-300 text-center">{item.date}</td>
                                        <td className="px-6 py-4 border-b border-gray-300 text-center">{item.time}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CollectionHistory;
