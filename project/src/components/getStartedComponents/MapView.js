import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const MapView = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Dynamically import Leaflet and its styles
    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    // Fetch routes data from API
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/API/Route/getAll");
        setRoutes(response.data);
      } catch (error) {
        setError("Failed to fetch routes. Please try again later.");
      }
    };

    fetchRoutes();

    // Create truck icon for markers
    const truckIcon = new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/8692/8692601.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    // Initialize the map
    const map = L.map('map').setView([14.0860746, 100.608406], 6);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Geolocation handling
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          const marker = L.marker([lat, long], { icon: truckIcon }).addTo(map);
          const circle = L.circle([lat, long], { radius: accuracy }).addTo(map);

          const featureGroup = L.featureGroup([marker, circle]).addTo(map);
          map.fitBounds(featureGroup.getBounds());
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      // Cleanup on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (map) {
          map.remove();
        }
      };
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, [isClient]);

  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>

      <div className="flex justify-center items-center mt-4 space-x-2">
        {error && <p className="text-red-500">{error}</p>}

        {routes.length > 0 ? (
          routes.map((route) => (
            <button
              key={route.routesID}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              {route.routeName}
            </button>
          ))
        ) : (
          <p className="text-gray-600">No routes available.</p>
        )}
      </div>
    </div>
  );
};

// Disable SSR for Leaflet map component
export default dynamic(() => Promise.resolve(MapView), { ssr: false });
