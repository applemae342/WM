// src/components/MapView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png'; // Import the marker icon
import markerShadow from 'leaflet/dist/images/marker-shadow.png'; // Import the marker shadow

const MapView = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  let map; // Declare map outside useEffect for cleanup
  let marker, circle; // Declare marker and circle outside for scope

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/API/Route/getAll");
        console.log("Routes fetched:", response.data);
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
        setError("Failed to fetch routes. Please try again later.");
      }
    };

    fetchRoutes();

    // Set the default icon for Leaflet markers
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    // Initialize the Leaflet map
    map = L.map('map').setView([14.0860746, 100.608406], 6);

    // Add OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handle geolocation
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          const accuracy = position.coords.accuracy;

          if (marker) {
            map.removeLayer(marker);
          }

          if (circle) {
            map.removeLayer(circle);
          }

          marker = L.marker([lat, long]).addTo(map);
          circle = L.circle([lat, long], { radius: accuracy }).addTo(map);

          const featureGroup = L.featureGroup([marker, circle]).addTo(map);
          map.fitBounds(featureGroup.getBounds());

          console.log(`Your coordinate is: Lat: ${lat} Long: ${long} Accuracy: ${accuracy}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      // Cleanup on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (map) {
          map.remove();
        }
      };
    } else {
      console.log("Your browser doesn't support geolocation feature!");
    }
  }, []);

  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <div id="map" style={{ width: '100%', height: '100%' }}></div> {/* Map container */}
      
      <div className="flex justify-center items-center mt-4 space-x-2"> {/* Button container */}
        {error && <p className="text-red-500">{error}</p>}
        
        {routes.length > 0 ? (
          routes.map((route) => (
            <button
              key={route.routesID} // Use unique ID for each button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
            >
              {route.routeName} {/* Display route name */}
            </button>
          ))
        ) : (
          <p className="text-gray-600">No routes available.</p>
        )}
      </div>
    </div>
  );
};

export default MapView;
