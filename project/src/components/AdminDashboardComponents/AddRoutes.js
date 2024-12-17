import React, { useEffect, useState } from "react";
import CollectionHistory from "../CollectionHistory";
import { AddIcon, PenIcon, TrashIcon } from "../heroIcons/Icons";

const DashboardCollectionRoutes = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newRoute, setNewRoute] = useState("");
    const [newCoveredPlaces, setNewCoveredPlaces] = useState("");
    const [routes, setRoutes] = useState([]);
    const [routeToDelete, setRouteToDelete] = useState(null);
    const [editingRoute, setEditingRoute] = useState(null);
    const [editRouteName, setEditRouteName] = useState("");
    const [editCoveredPlaces, setEditCoveredPlaces] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(null);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const response = await fetch("http://localhost:8000/API/Route/getAll");
                const data = await response.json();
                setRoutes(data);
            } catch (error) {
                console.error("Error fetching routes:", error);
            }
        };

        fetchRoutes();
    }, []);

    const displayFeedbackMessage = (message) => {
        setFeedbackMessage(message);
        setTimeout(() => {
            setFeedbackMessage("");
        }, 1000);
    };

    const handleAddRoute = async () => {
        try {
            const response = await fetch("http://localhost:8000/API/Route/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ routeName: newRoute, coveredPlaces: newCoveredPlaces }),
            });

            if (response.ok) {
                const addedRoute = await response.json();
                setRoutes([...routes, addedRoute]);
                setNewRoute("");
                setNewCoveredPlaces("");
                setIsAddModalOpen(false);
                displayFeedbackMessage("Route added successfully!");
            }
        } catch (error) {
            console.error("Error adding route:", error);
        }
    };

    const handleEditToggle = (route) => {
        setEditingRoute(route.routesID);
        setEditRouteName(route.routeName);
        setEditCoveredPlaces(route.coveredPlaces);
    };

    const handleSaveEdit = async () => {
        if (!editRouteName.trim() || !editCoveredPlaces.trim()) {
            displayFeedbackMessage("Route name and covered places cannot be empty!");
            return;
        }
        try {
            await fetch(`http://localhost:8000/API/Route/update/${editingRoute}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ routeName: editRouteName, coveredPlaces: editCoveredPlaces }),
            });
            setRoutes((prevRoutes) =>
                prevRoutes.map((r) => (r.routesID === editingRoute ? { ...r, routeName: editRouteName, coveredPlaces: editCoveredPlaces } : r))
            );
            setEditingRoute(null);
            setEditRouteName("");
            setEditCoveredPlaces("");
            displayFeedbackMessage("Route updated successfully!");
        } catch (error) {
            console.error("Error updating route:", error);
        }
    };

    const handleDeleteRoute = async () => {
        try {
            await fetch(`http://localhost:8000/API/Route/delete/${routeToDelete}`, {
                method: "DELETE",
            });
            setRoutes(routes.filter((route) => route.routesID !== routeToDelete));
            setRouteToDelete(null);
            setIsDeleteModalOpen(false);
            displayFeedbackMessage("Route deleted successfully!");
        } catch (error) {
            console.error("Error deleting route:", error);
        }
    };

    return (
        <div className="dashboard-collection-routes font-sans">
            <header className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#000000]">Lists of Routes</h1>
                {feedbackMessage && (
                    <p className="text-green-600 mt-2">{feedbackMessage}</p>
                )}
            </header>
            <div className="overflow-x-auto mb-6">
                <div className="flex justify-end mb-5">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all"
                        aria-label="Add New Route"
                    >
                        <AddIcon />
                        <span className="ml-2">Add Route</span>
                    </button>
                </div>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Routes</th>
                            <th className="py-3 px-6 text-left text-gray-700 font-semibold">Covered Places</th>
                            <th className="w-32 py-3 px-6 text-left text-gray-700 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map((route) => (
                            <tr key={route.routesID} className="hover:bg-gray-50 transition-all">
                                <td className="py-3 px-6">{editingRoute === route.routesID ? (
                                    <input
                                        type="text"
                                        value={editRouteName}
                                        onChange={(e) => setEditRouteName(e.target.value)}
                                        className="border p-2 w-full rounded"
                                    />
                                ) : (
                                    route.routeName
                                )}</td>
                                <td className="py-3 px-6">
                                    {editingRoute === route.routesID ? (
                                        <input
                                            type="text"
                                            value={editCoveredPlaces}
                                            onChange={(e) => setEditCoveredPlaces(e.target.value)}
                                            className="border p-2 w-full rounded"
                                        />
                                    ) : (
                                        route.coveredPlaces
                                    )}
                                </td>
                                <td className="py-3 px-6 flex justify-center">
                                    {editingRoute === route.routesID ? (
                                        <button
                                            onClick={handleSaveEdit}
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition-all"
                                            aria-label="Save Changes"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <div className="relative">
                                            <button
                                                onClick={() => setDropdownOpen(dropdownOpen === route.routesID ? null : route.routesID)}
                                                className="text-gray-600 hover:text-gray-800 text-xl"
                                                aria-label="Options"    
                                            >
                                                ...
                                            </button>
                                            {dropdownOpen === route.routesID && (
                                                <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md border border-gray-200 z-10">
                                                    <button
                                                        onClick={() => handleEditToggle(route)}
                                                        className="block px-4 py-2"
                                                        aria-label="Edit Route"
                                                    >
                                                         Edit
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setRouteToDelete(route.routesID);
                                                            setIsDeleteModalOpen(true);
                                                            setDropdownOpen(null);
                                                        }}
                                                        className="block px-4 py-2"
                                                        aria-label="Delete Route"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <CollectionHistory />

            {/* Modal for Adding New Route */}
{isAddModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="bg-light-green p-8 rounded-xl shadow-2xl border-t-4 border-green-700 w-4/5 sm:w-96"
      style={{ backgroundColor: "#f0fdf4" }}
    >
      <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
        Add New Route
      </h2>
      <input
        type="text"
        value={newRoute}
        onChange={(e) => setNewRoute(e.target.value)}
        placeholder="Route Name"
        className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
      />
      <input
        type="text"
        value={newCoveredPlaces}
        onChange={(e) => setNewCoveredPlaces(e.target.value)}
        placeholder="Covered Places"
        className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
      />
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleAddRoute}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          aria-label="Add Route"
        >
          Add
        </button>
        <button
          onClick={() => setIsAddModalOpen(false)}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          aria-label="Close Modal"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


            {/* Modal for Deleting Route */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4 text-red-500">Delete Route</h2>
                        <p>Are you sure you want to delete this route?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleDeleteRoute}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                aria-label="Delete Route"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="bg-gray-300 text-black px-4 py-2 rounded"
                                aria-label="Close Modal"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardCollectionRoutes;
