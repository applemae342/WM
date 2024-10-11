import React, { useEffect, useState } from "react";
import CollectionHistory from "../CollectionHistory";
import { AddIcon, PenIcon, TrashIcon } from "../heroIcons/Icons";

const DashboardCollectionRoutes = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newRoute, setNewRoute] = useState("");
    const [routes, setRoutes] = useState([]);
    const [routeToDelete, setRouteToDelete] = useState(null);
    const [editingRoute, setEditingRoute] = useState(null);
    const [editRouteName, setEditRouteName] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Fetch routes on component mount
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
        }, 1000); // Clear the message after 1 second
    };

    const handleAddRoute = async () => {
        try {
            const response = await fetch("http://localhost:8000/API/Route/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ routeName: newRoute }),
            });

            if (response.ok) {
                const addedRoute = await response.json();
                setRoutes([...routes, addedRoute]);
                setNewRoute("");
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
    };

    const handleSaveEdit = async () => {
        if (!editRouteName.trim()) {
            displayFeedbackMessage("Route name cannot be empty!");
            return;
        }
        try {
            await fetch(`http://localhost:8000/API/Route/update/${editingRoute}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ routeName: editRouteName }),
            });
            setRoutes((prevRoutes) =>
                prevRoutes.map((r) =>
                    r.routesID === editingRoute ? { ...r, routeName: editRouteName } : r
                )
            );
            setEditingRoute(null);
            setEditRouteName("");
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
        <div className="dashboard-collection-routes font-sans"> {/* Ensure all text uses Open Sans */}
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold text-[#2E8ECA]"> {/* Font size 18 and color #2E8ECA */}
                    Lists of Routes
                </h1>
                {feedbackMessage && <p className="text-green-500">{feedbackMessage}</p>}
            </header>
            <div className="table-container overflow-x-auto">
                <div className="flex justify-end mb-5">
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        aria-label="Add New Route"
                        className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                        <AddIcon />
                        <span className="ml-2">Add Route</span>
                    </button>
                </div>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left text-gray-600 font-semibold">Routes</th>
                            <th className="w-32 py-2 px-4 border-b text-left text-gray-600 font-semibold">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routes.map((route) => (
                            <tr key={route.routesID} className="hover:bg-gray-50 transition-colors">
                                <td className="py-2 px-4 border-b">
                                    {editingRoute === route.routesID ? (
                                        <div className="flex items-center">
                                            <input
                                                type="text"
                                                value={editRouteName}
                                                onChange={(e) => setEditRouteName(e.target.value)}
                                                className="border-b p-1 rounded outline-none mr-2"
                                            />
                                            <button
                                                onClick={handleSaveEdit}
                                                className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                                aria-label="Save Changes"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        route.routeName
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b flex space-x-2">
                                    <button
                                        onClick={() => handleEditToggle(route)}
                                        className="text-blue-500 hover:text-blue-700"
                                        aria-label="Edit Route"
                                    >
                                        <PenIcon />
                                    </button>
                                    <button
                                        onClick={() => {
                                            setRouteToDelete(route.routesID);
                                            setIsDeleteModalOpen(true);
                                        }}
                                        aria-label="Delete Route"
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <TrashIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-10 font-sans"> {/* Ensure all text in Collection History uses Open Sans */}
                <CollectionHistory />
            </div>

            {/* Modal for Adding New Route */}
            {isAddModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-5 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Add New Route</h2>
                        <input
                            type="text"
                            value={newRoute}
                            onChange={(e) => setNewRoute(e.target.value)}
                            placeholder="Enter route name"
                            className="border border-gray-300 p-2 w-full rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleAddRoute} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                                Add Route
                            </button>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="ml-2 bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Deleting Route */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-5 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this route?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={handleDeleteRoute} className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600">
                                Delete
                            </button>
                            <button
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="ml-2 bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400"
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
