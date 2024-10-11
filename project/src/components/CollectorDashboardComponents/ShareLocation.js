import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';

const MapView = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false); // Control map visibility
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false); // For route confirmation modal
  const [selectedRoute, setSelectedRoute] = useState(null); // To track the clicked route
  const [completedRoutes, setCompletedRoutes] = useState([]); // Track completed routes

  useEffect(() => {
    setIsClient(typeof window !== 'undefined');
    
    const agreedToShareLocation = localStorage.getItem('agreedToShareLocation');
    if (agreedToShareLocation === 'true') {
      setMapVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isClient || !mapVisible) return;

    const L = require('leaflet');
    require('leaflet/dist/leaflet.css');

    const fetchRoutes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/API/Route/getAll");
        setRoutes(response.data);
      } catch (error) {
        setError("Failed to fetch routes. Please try again later.");
      }
    };

    fetchRoutes();

    const truckIcon = new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/8692/8692601.png',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
    });

    const map = L.map('map').setView([14.0860746, 100.608406], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    let marker, circle;

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

          marker = L.marker([lat, long], { icon: truckIcon }).addTo(map);
          circle = L.circle([lat, long], { radius: accuracy }).addTo(map);

          const featureGroup = L.featureGroup([marker, circle]).addTo(map);
          map.fitBounds(featureGroup.getBounds());
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        if (map) {
          map.remove();
        }
      };
    } else {
      console.log("Geolocation is not supported by your browser.");
    }
  }, [isClient, mapVisible]);

  const handleShareLocationClick = () => {
    setModalVisible(true);
  };

  const handleAgreeClick = () => {
    setModalVisible(false);
    setMapVisible(true);
    localStorage.setItem('agreedToShareLocation', 'true');
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setMapVisible(false);
  };

  const handleStopSharing = () => {
    setMapVisible(false);
    localStorage.removeItem('agreedToShareLocation');
  };

  const handleRouteClick = (route) => {
    setSelectedRoute(route);
    setConfirmationModalVisible(true);
  };

  const handleConfirmYes = () => {
    // Mark the selected route as completed
    setCompletedRoutes((prevCompletedRoutes) => [...prevCompletedRoutes, selectedRoute.routesID]);
    setConfirmationModalVisible(false);
  };

  const handleConfirmNo = () => {
    setConfirmationModalVisible(false);
  };

  return (
    <div className="container mx-auto mt-4">
      <button
        onClick={mapVisible ? handleStopSharing : handleShareLocationClick}
        className={`bg-${mapVisible ? 'red' : 'green'}-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-${mapVisible ? 'red' : 'green'}-600 transition-colors duration-300 mb-4`}
      >
        {mapVisible ? 'Stop sharing' : 'Share your location...'}
      </button>

      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-60">
            <h2 className="text-lg font-semibold mb-4">Terms and Conditions</h2>
            <p className="mb-4">
              By sharing your location, you agree to the following terms:
              <ul className="list-disc list-inside">
                <li>Your location data may be shared with third parties.</li>
                <li>You can revoke access to your location at any time.</li>
                <li>We are not responsible for any misuse of your location data.</li>
              </ul>
            </p>
            <div className="flex justify-between">
              <button onClick={handleAgreeClick} className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg">
                I Agree
              </button>
              <button onClick={handleCloseModal} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {mapVisible && (
        <div className="relative" style={{ height: '500px', zIndex: 0 }}>
          <div id="map" style={{ width: '100%', height: '100%' }}></div>
        </div>
      )}

      <div className="mt-4 flex justify-center items-center space-x-2">
        {error && <p className="text-red-500">{error}</p>}

        {routes.length > 0 ? (
          routes.map((route) => (
            <button
              key={route.routesID}
              onClick={() => handleRouteClick(route)}
              className={`${
                completedRoutes.includes(route.routesID) ? 'bg-green-500' : 'bg-blue-500'
              } text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-${
                completedRoutes.includes(route.routesID) ? 'green-600' : 'blue-600'
              } transition-colors duration-300`}
            >
              {route.routeName}
            </button>
          ))
        ) : (
          <p className="text-gray-600">No routes available.</p>
        )}
      </div>

      {confirmationModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full z-60">
            <h2 className="text-lg font-semibold mb-4">Route Completion</h2>
            <p className="mb-4">Means you're done in this route. Are you sure?</p>
            <div className="flex justify-between">
              <button onClick={handleConfirmYes} className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
                Yes
              </button>
              <button onClick={handleConfirmNo} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(MapView), { ssr: false });
