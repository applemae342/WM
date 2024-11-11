import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import Leaflet to prevent SSR issues
const MapView = () => {
  const [isClient, setIsClient] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [flagData, setFlagData] = useState([]);
  const mapRef = useRef(null); // Ref to hold the map instance

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/API/flag/getAll");
        setFlagData(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching flag data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!isClient || !mapVisible || !flagData.length) return;

    const L = require("leaflet");
    require("leaflet/dist/leaflet.css");

    // Define the custom truck icon
    const truckIcon = new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/8692/8692601.png",
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // Initialize the map if it's not already initialized
    if (!mapRef.current) {
      const map = L.map("map").setView([14.0860746, 100.608406], 6);
      mapRef.current = map; // Store map instance in ref

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Add markers for each flag data item using the truck icon
      flagData.forEach((flag) => {
        const marker = L.marker([flag.latitude, flag.longitude], { icon: truckIcon })
          .addTo(mapRef.current)
          .bindPopup(`<b>${flag.userName}</b>`)
          .openPopup();

        // Set a label for each marker using userName
        marker.bindTooltip(`${flag.userName}`, { permanent: true, offset: [0, -15] }).openTooltip();
      });
    }
  }, [isClient, mapVisible, flagData]);

  const handleShowMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log("Current Latitude:", lat);
          console.log("Current Longitude:", lon);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );
    }
    setMapVisible(true);
  };

  return (
    <div className="container mx-auto mt-4">
      <button
        onClick={handleShowMap}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300 mb-4"
      >
        Show Map
      </button>

      {mapVisible && (
        <div id="map" style={{ height: "500px" }}></div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapView), { ssr: false });
