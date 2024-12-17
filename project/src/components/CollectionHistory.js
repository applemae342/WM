import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic"; // Import dynamic
import "leaflet/dist/leaflet.css";

// Dynamically import MapContainer, TileLayer, Marker, and Popup components
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const CollectionHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedGroups, setExpandedGroups] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isClient, setIsClient] = useState(false); // Track if we're on the client-side
    const [customMarkerIcon, setCustomMarkerIcon] = useState(null); // State for the custom marker icon

    // Set isClient to true once the component mounts
    useEffect(() => {
        setIsClient(true);
        // Load the custom marker icon on the client-side
        if (typeof window !== "undefined") {
            const L = require("leaflet");
            const icon = new L.Icon({
                iconUrl: "/path/to/your/custom-marker.png", // Set the path to your marker image
                iconSize: [32, 32],
                iconAnchor: [16, 32],
                popupAnchor: [0, -32],
            });
            setCustomMarkerIcon(icon); // Save the icon to state
        }
    }, []);

    // Fetch data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/API/history/getAll");
                const sortedData = response.data.sort(
                    (a, b) => new Date(b.date) - new Date(a.date)
                );
                setData(sortedData);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Delete records by date
    const handleDeleteByDate = async (date) => {
        try {
            const response = await axios.delete(`http://localhost:8000/API/history/delete/${date}`);
            alert(response.data.message);
            setData((prevData) => prevData.filter((item) => {
                const itemDate = new Date(item.date).toISOString().split("T")[0];
                return itemDate !== date;
            }));
        } catch (err) {
            console.error(err);
            alert("Failed to delete records for the selected date.");
        }
    };

    // Filter data based on search query
    const filteredData = data.filter(
        (item) =>
            item.latitude?.toString().includes(searchQuery) ||
            item.longitude?.toString().includes(searchQuery) ||
            item.date?.includes(searchQuery)
    );

    // Group data by date (YYYY-MM-DD format)
    const groupedData = filteredData.reduce((acc, item) => {
        const dateKey = new Date(item.date).toISOString().split("T")[0];
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(item);
        return acc;
    }, {});

    // Toggle group visibility
    const toggleGroup = (dateKey) => {
        setExpandedGroups((prev) => ({
            ...prev,
            [dateKey]: !prev[dateKey],
        }));
    };

    // Handle modal open
    const handleViewClick = (latitude, longitude) => {
        setSelectedLocation({ latitude, longitude });
        setModalOpen(true);
    };

    // Close modal
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedLocation(null);
    };

    return (
        <div className="mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl text-center mb-8 text-gray-800">Collection History</h1>
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[15rem] p-2 border border-gray-300 rounded-md outline-none"
                />
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[500px] overflow-y-auto">
                    {loading ? (
                        <p className="text-center text-gray-500">Loading...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : Object.keys(groupedData).length === 0 ? (
                        <p className="text-center text-gray-500">No results found.</p>
                    ) : (
                        Object.entries(groupedData).map(([dateKey, items]) => (
                            <div key={dateKey} className="mb-4 border border-gray-300 rounded-lg">
                                <div
                                    className="flex justify-between items-center bg-gray-200 p-3 cursor-pointer"
                                    onClick={() => toggleGroup(dateKey)}
                                >
                                    <div>
                                        <span className="font-bold">{dateKey}</span>
                                        <span className="ml-2 text-gray-600">
                                            ({items.length} record{items.length > 1 ? "s" : ""})
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="bg-gray-600 text-white px-3 py-1 rounded-md">
                                            {expandedGroups[dateKey] ? "Hide" : "Show"}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteByDate(dateKey)}
                                            className="bg-red-600 text-white px-3 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                {expandedGroups[dateKey] && (
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
                                                <th className="px-6 py-3 text-left">Username</th>
                                                <th className="px-6 py-3 text-left">View</th>
                                                <th className="px-6 py-3 text-left">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr
                                                    key={index}
                                                    className={`hover:bg-gray-50 ${
                                                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                                    }`}
                                                >
                                                    <td className="px-6 py-4">{item.userName}</td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() =>
                                                                handleViewClick(item.latitude, item.longitude)
                                                            }
                                                            className="bg-gray-600 text-white px-3 py-1 rounded-md"
                                                        >
                                                            Click here to View
                                                        </button>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {new Date(item.date).toLocaleTimeString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Custom Modal to show the map */}
            {modalOpen && isClient && customMarkerIcon && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-[80%] max-w-4xl relative">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-center text-xl font-semibold mb-4">Location Details</h2>
                        <MapContainer
                            center={[selectedLocation.latitude, selectedLocation.longitude]}
                            zoom={16}
                            style={{ height: "400px", width: "100%" }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
                            />
                            <Marker
                                position={[selectedLocation.latitude, selectedLocation.longitude]}
                                icon={customMarkerIcon}
                            >
                                <Popup>
                                    <p>Location: {selectedLocation.latitude}, {selectedLocation.longitude}</p>
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectionHistory;
