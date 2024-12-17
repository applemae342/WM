import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import Leaflet to prevent SSR issues
const MapViewAdmin = () => {
  const [isClient, setIsClient] = useState(false);
  const [flagData, setFlagData] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null); // Ref to hold the map instance
  const [currentLocation, setCurrentLocation] = useState({
    latitude: null,
    longitude: null,
  });

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

  // Initialize map only when map is visible and the container exists
  useEffect(() => {
    if (!isClient || !currentLocation.latitude || !currentLocation.longitude)
      return;

    const L = require("leaflet");
    require("leaflet/dist/leaflet.css");

    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView(
        [currentLocation.latitude, currentLocation.longitude],
        15
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Marker for the user's current location
      const userIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png", // User icon URL
        iconSize: [35, 35],
        iconAnchor: [17.5, 35],
        popupAnchor: [0, -35],
      });

      L.marker([currentLocation.latitude, currentLocation.longitude], {
        icon: userIcon,
      })
        .addTo(map)
        .bindTooltip("You", { permanent: true, offset: [0, -15] })
        .openTooltip();

      // Marker for trucks
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
            .bindTooltip(`${flag.userName}`, {
              permanent: true,
              offset: [0, -15],
            })
            .openTooltip();
        }
      });

      mapRef.current = map; // Store the map instance for future use
    }
  }, [isClient, flagData, currentLocation]);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Truck Location
      </h2>

      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="spinner-container">
            <div className="spinner"></div>
            <p className="ml-4 text-lg text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      <div id="map" style={{ height: "500px" }} ref={mapRef}></div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapViewAdmin), { ssr: false });
