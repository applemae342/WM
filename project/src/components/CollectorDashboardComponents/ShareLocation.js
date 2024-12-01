import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import Leaflet to prevent SSR issues
const MapView = () => {
    const [isClient, setIsClient] = useState(false);
    const [mapVisible, setMapVisible] = useState(false); // To control visibility of the map
    const [flagData, setFlagData] = useState([]);
    const [loading, setLoading] = useState(false);
    const mapRef = useRef(null); // Ref to hold the map instance
    const [currentLocation, setCurrentLocation] = useState({ latitude: null, longitude: null });
    const [sharingLocation, setSharingLocation] = useState(false); // Track whether location is being shared
    const [showModal, setShowModal] = useState(true); // Control modal visibility
    const [lastHistoryTime, setLastHistoryTime] = useState(null); // Track the last record creation time

    useEffect(() => {
        setIsClient(typeof window !== "undefined");
    }, []);

    const fetchFlagData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/API/flag/getAll");
            console.log("API Response:", response.data);
            setFlagData(response.data);
        } catch (error) {
            console.error("Error fetching flag data:", error);
        }
    };

    useEffect(() => {
        fetchFlagData();
        const intervalId = setInterval(() => {
            fetchFlagData();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        setCurrentLocation({ latitude: lat, longitude: lon });
                        console.log("Updated Latitude:", lat);
                        console.log("Updated Longitude:", lon);
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    },
                    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
                );
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
  // Original flag update logic
    useEffect(() => {
        const intervalId = setInterval(async () => {
            const truckId = localStorage.getItem("truckId");

            if (truckId && currentLocation.latitude && currentLocation.longitude) {
                try {
                    const flagStatus = mapVisible ? "yes" : "no";

                    const response = await axios.put(`http://localhost:8000/API/flag/update/${truckId}`, {
                        flagStatus,
                        latitude: currentLocation.latitude,
                        longitude: currentLocation.longitude,
                    });
                    console.log("Record Updated:", response.data);
                } catch (error) {
                    console.error("Error updating flag record:", error);
                }
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [mapVisible, currentLocation]);

    const createHistoryRecord = async () => {
        // Ensure first record is created only once
        if (mapVisible && currentLocation.latitude && currentLocation.longitude) {
            const truckUsername = localStorage.getItem("truckUsername");
            if (truckUsername) {
                const truckId = localStorage.getItem("truckId");
                const currentTime = new Date().getTime();
                if (truckId && (!lastHistoryTime || currentTime - lastHistoryTime >= 1200000)) {
                    try {
                        // Create the first history record immediately
                        const historyResponse = await axios.post("http://localhost:8000/API/history/create", {
                            userName: truckUsername,
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                        });
                        console.log("History Record Created:", historyResponse.data);
                        
                        // Set the time of the last history record creation
                        setLastHistoryTime(currentTime);
                    } catch (error) {
                        console.error("Error creating history record:", error);
                    }
                }
            }
        }
    };

    useEffect(() => {
        if (sharingLocation) {
            createHistoryRecord(); // Create record when location sharing starts
        }
    }, [sharingLocation, mapVisible, currentLocation]);

    useEffect(() => {
        if (!isClient || !mapVisible || !flagData.length || !currentLocation.latitude || !currentLocation.longitude) return;

        const L = require("leaflet");
        require("leaflet/dist/leaflet.css");

        if (mapVisible && mapRef.current && !mapRef.current._leaflet_id) {
            const map = L.map(mapRef.current).setView([currentLocation.latitude, currentLocation.longitude], 15);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "&copy; OpenStreetMap contributors",
            }).addTo(map);

            const truckIcon = new L.Icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/8692/8692601.png",
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40],
            });

            flagData.forEach((flag) => {
                if (flag.flagStatus === "yes") {
                    L.marker([flag.latitude, flag.longitude], { icon: truckIcon })
                        .addTo(map)
                        .bindTooltip(`${flag.userName}`, { permanent: true, offset: [0, -15] })
                        .openTooltip();
                }
            });

            mapRef.current = map;
        }
    }, [isClient, mapVisible, flagData, currentLocation]);

    const handleShowMap = async () => {
        setLoading(true);
        setMapVisible(true);

        if (currentLocation.latitude && currentLocation.longitude) {
            const truckId = localStorage.getItem("truckId");
            const truckUsername = localStorage.getItem("truckUsername");

            if (truckId && truckUsername) {
                const userInFlags = flagData.some((flag) => flag.userID === truckId);

                if (!userInFlags) {
                    try {
                        const response = await axios.post("http://localhost:8000/API/flag/create", {
                            flagStatus: "yes",
                            userName: truckUsername,
                            latitude: currentLocation.latitude,
                            longitude: currentLocation.longitude,
                            userID: truckId,
                        });
                        console.log("Record Created:", response.data);
                    } catch (error) {
                        console.error("Error creating flag record:", error);
                    }
                }
            }
        }

        setLoading(false);
        setSharingLocation(true); // Start sharing location
    };

    const handleStopSharing = () => {
        setSharingLocation(false); // Stop sharing location
        setMapVisible(false);
        setLastHistoryTime(null); // Reset history record time when stopping sharing
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    return (
        <div className="container mx-auto mt-4">
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Terms and Conditions for Location Sharing</h2>
                        <p className="text-gray-700 mb-4">By proceeding to share your location, you acknowledge and agree to the following:</p>
                        <ul className="list-disc pl-5 mb-4 text-gray-700">
                            <li>
                                <strong>Permission to Access Location:</strong> This application will collect your real-time location data to provide
                                location-based services such as tracking and route sharing.
                            </li>
                            <li>
                                <strong>Data Usage:</strong> Your location data will only be used for the purposes of this application and will not be
                                shared with third parties without your explicit consent.
                            </li>
                            <li>
                                <strong>Accuracy and Limitations:</strong> The accuracy of the location data depends on your device's GPS and network
                                capabilities.
                            </li>
                            <li>
                                <strong>Consent Withdrawal:</strong> You can stop sharing your location at any time by clicking the "Stop Sharing"
                                button.
                            </li>
                            <li>
                                <strong>Privacy Assurance:</strong> Your personal data will be handled securely.
                            </li>
                        </ul>
                        <button
                            onClick={handleModalClose}
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300"
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            )}

            <button
                onClick={sharingLocation ? handleStopSharing : handleShowMap}
                className={`${sharingLocation ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mb-4`}
                disabled={showModal}
            >
                {sharingLocation ? "Stop Sharing" : "Share Your Location"}
            </button>

            {loading && (
                <div className="flex justify-center items-center h-40">
                    <div className="spinner-container">
                        <div className="spinner"></div>
                        <p className="ml-4 text-lg text-gray-600">Loading map...</p>
                    </div>
                </div>
            )}

            {mapVisible && <div ref={mapRef} style={{ height: "400px", width: "100%" }}></div>}
        </div>
    );
};

export default MapView;
