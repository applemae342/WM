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

  // Update current location every second
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

  // Update the flag location every second
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const truckId = localStorage.getItem("truckId");

      if (truckId && currentLocation.latitude && currentLocation.longitude) {
        try {
          // Set flagStatus based on map visibility
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
    }, 1000); // Executes every 1 second

    return () => clearInterval(intervalId);
  }, [mapVisible, currentLocation]);

  // Initialize map only when map is visible and the container exists
  useEffect(() => {
    if (!isClient || !mapVisible || !flagData.length || !currentLocation.latitude || !currentLocation.longitude) return;

    const L = require("leaflet");
    require("leaflet/dist/leaflet.css");

    // Check if map container is available before initializing the map
    if (mapVisible && mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([currentLocation.latitude, currentLocation.longitude], 15);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Define the custom truck icon
      const truckIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/8692/8692601.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      // Add markers only if flagStatus is "yes"
      flagData.forEach((flag) => {
        if (flag.flagStatus === "yes") {
          L.marker([flag.latitude, flag.longitude], { icon: truckIcon })
            .addTo(map)
            .bindTooltip(`${flag.userName}`, { permanent: true, offset: [0, -15] })
            .openTooltip();
        }
      });

      mapRef.current = map; // Store the map instance for future use
    }
  }, [isClient, mapVisible, flagData, currentLocation]);

  const handleShowMap = async () => {
    setLoading(true);
    setMapVisible(true); // Always set mapVisible to true when the button is clicked

    if (currentLocation.latitude && currentLocation.longitude) {
      const truckId = localStorage.getItem("truckId");
      const plateNumber = localStorage.getItem("plateNumber");
      const truckUsername = localStorage.getItem("truckUsername");
      const description = localStorage.getItem("description");
      const routesID = localStorage.getItem("routesID");

      if (truckId && plateNumber && truckUsername) {
        const userInFlags = flagData.some(flag => flag.userID === truckId);

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
        } else {
          console.log("Truck ID already exists in flag data.");
        }
      }
    }

    setLoading(false);
    setSharingLocation(true);
  };

  const handleStopSharing = () => {
    setSharingLocation(false);
    setMapVisible(false); // You can still hide the map when you stop sharing
  };

  return (
    <div className="container mx-auto mt-4">
      <button
        onClick={sharingLocation ? handleStopSharing : handleShowMap}
        className={`${
          sharingLocation ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        } text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-300 mb-4`}
      >
        {sharingLocation ? "Stop Sharing" : "Share Your Location"}
      </button>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="ml-4 text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {mapVisible && !loading && <div id="map" style={{ height: "500px" }} ref={mapRef}></div>}
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapView), { ssr: false });
