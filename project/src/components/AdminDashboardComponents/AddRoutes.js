import React, { useState } from "react";
import CollectionHistory from "../CollectionHistory";
import { AddIcon, PenIcon, TrashIcon } from "../heroIcons/Icons";

const DashboardCollectionRoutes = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [newRoute, setNewRoute] = useState("");
    const [routes, setRoutes] = useState([{ id: 1, name: "Sample Route", isEditing: false }]); // Sample data
    const [routeToDelete, setRouteToDelete] = useState(null);

    const handleAddRoute = () => {
        const updatedRoutes = [...routes, { id: Date.now(), name: newRoute, isEditing: false }];
        setRoutes(updatedRoutes);
        setNewRoute("");
        setIsAddModalOpen(false);
    };

    const handleEditToggle = (id) => {
        const updatedRoutes = routes.map((route) => {
            if (route.id === id) {
                return { ...route, isEditing: !route.isEditing };
            }
            return { ...route, isEditing: false }; // Close editing for other routes
        });
        setRoutes(updatedRoutes);
    };

    const handleEditChange = (id, value) => {
        const updatedRoutes = routes.map((route) => {
            if (route.id === id) {
                return { ...route, name: value };
            }
            return route;
        });
        setRoutes(updatedRoutes);
    };

    const handleDeleteRoute = () => {
        const updatedRoutes = routes.filter((route) => route.id !== routeToDelete);
        setRoutes(updatedRoutes);
        setRouteToDelete(null);
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="dashboard-collection-routes">
            <header className="text-center mb-4">
                <h1>Add Route</h1>
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
                            <tr key={route.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-2 px-4 border-b">
                                    {route.isEditing ? (
                                        <input
                                            type="text"
                                            value={route.name}
                                            onChange={(e) => handleEditChange(route.id, e.target.value)}
                                            className="border-b p-1 rounded outline-none"
                                            onBlur={() => handleEditToggle(route.id)} // optional to close on blur
                                        />
                                    ) : (
                                        route.name
                                    )}
                                </td>
                                <td className="py-2 px-4 border-b flex space-x-2">
                                    {route.isEditing ? (
                                        <button
                                            onClick={() => handleEditToggle(route.id)}
                                            className="text-green-500 hover:text-green-700"
                                            aria-label="Save Changes"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditToggle(route.id)}
                                            className="text-blue-500 hover:text-blue-700"
                                            aria-label="Edit Route"
                                        >
                                            <PenIcon />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            setRouteToDelete(route.id);
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
            <div className="mt-10">
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
