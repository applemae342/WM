import React, { useEffect, useState } from "react";
import { TrashIcon } from "../heroIcons/Icons";
import axios from "axios";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalOpen, setModalOpen] = useState(false); // Add User modal
  const [modalOpen1, setModalOpen1] = useState(false); // Add Truck modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // Type of item being deleted (user or truck)
  const [trucks, setTrucks] = useState([]); // Assuming `trucks` is already fetched
  const [editTruckId, setEditTruckId] = useState(null); // Store the truck ID being edited
  const [loading, setLoading] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // Modal state
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null); // Store user ID to be
  const [errorMessage, setErrorMessage] = useState(null);
  const [visibleMenuId, setVisibleMenuId] = useState(null); // State to tr
  const [menuVisible, setMenuVisible] = useState(false); // State to toggle the visibility
  const [editTruckDetails, setEditTruckDetails] = useState({
    plateNumber: "",
    username: "",
    description: "",
    routesID: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false); // Open/close the edit modal

  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    contactNumber: "",
    address: "",
    password: "default1",
  });
  const handleReCreatePassword = async () => {
    if (!selectedUserId) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      // API call to update password
      const response = await axios.put(
        `http://localhost:8000/API/users/updatepassword/${selectedUserId}`,
        { password: "newpass123", reset: "no" }
      );
    } catch (error) {
      setErrorMessage("Failed to update password. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
      setConfirmModalOpen(false); // Close modal after the API call
    }
  };
  const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Are you sure?</h2>
          <p className="text-gray-600">
            This will reset the user's password to "newpass123".
          </p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  const openConfirmModal = (userId) => {
    setSelectedUserId(userId);
    setConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setConfirmModalOpen(false);
    setSelectedUserId(null); // Reset selected user ID
  };
  const [newTruck, setNewTruck] = useState({
    plateNumber: "",
    description: "",
    password: "default123",
    routesID: "",
  });
  const [routes, setRoutes] = useState([]); // List of routes
  const [routesId, setRoutesId] = useState(""); // Store selected route ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/API/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchRoutes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/API/Route/getAll"
        );
        setRoutes(response.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    const fetchTrucks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/API/RegisterTruck/getAll"
        );
        setTrucks(response.data);
      } catch (error) {
        console.error("Error fetching trucks:", error);
      }
    };

    fetchTrucks();
    fetchRoutes();
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditTruck = (truck) => {
    setEditTruckId(truck.truckId);
    setEditTruckDetails(truck);
    setEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTruckDetails((prev) => ({ ...prev, [name]: value }));
  };

  const saveTruckChanges = async () => {
    try {
      // Conditionally add the default password if the toggle is checked
      if (editTruckDetails.active) {
        editTruckDetails.password = "newpass123"; 
        editTruckDetails.reset = "no"; // Add default password
      }

      const response = await fetch(
        `http://localhost:8000/API/RegisterTruck/update/${editTruckId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editTruckDetails),
        }
      );

      if (response.ok) {
        const updatedTruck = await response.json();
        setTrucks((prevTrucks) =>
          prevTrucks.map((truck) =>
            truck.truckId === editTruckId ? updatedTruck : truck
          )
        );
        setEditModalOpen(false);
        setEditTruckId(null);
        setEditTruckDetails(null);
        console.log(editTruckDetails);
      } else {
        alert("Failed to update truck details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating truck:", error);
      alert("An error occurred while updating truck details.");
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveNewUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/API/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const addedUser = await response.json();
        setUsers([...users, addedUser.user]);
        setModalOpen(false);
        setNewUser({
          firstname: "",
          lastname: "",
          username: "",
          contactNumber: "",
          address: "",
          password: "default1",
        });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add user");
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  };

  const handleNewTruckChange = (e) => {
    const { name, value } = e.target;
    setNewTruck((prevState) => ({ ...prevState, [name]: value }));
  };

  const saveNewTruck = async () => {
    try {
      // Create the request body with the new truck details, including the routesID
      const requestBody = { ...newTruck, routesID: routesId };
      console.log("Request Body for New Truck:", requestBody);

      const response = await fetch(
        "http://localhost:8000/API/RegisterTruck/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log("Response Status:", response.status);

      // Check if the response is OK (status 200-299)
      if (response.ok) {
        const addedTruck = await response.json();
        console.log("Added Truck Data:", addedTruck);

        // Add the newly created truck to the existing trucks list in the state
        setTrucks((prevTrucks) => [...prevTrucks, addedTruck]);

        // Clear the form fields and close the modal
        setModalOpen1(false);
        setNewTruck({
          plateNumber: "",
          description: "",
          routesID: "",
          password: "default",
        });
        setRoutesId("");

        // Optionally, show a success message
      } else {
        // Handle errors (e.g., validation errors from backend)
        const errorData = await response.json();
        console.error("Error Response Data:", errorData);
        alert(errorData.message || "Failed to add truck");
      }
    } catch (error) {
      console.error("Error adding truck:", error);
      alert("An error occurred while adding the truck. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const url =
        deleteType === "user"
          ? `http://localhost:8000/API/users/${deleteItemId}`
          : `http://localhost:8000/API/RegisterTruck/delete/${deleteItemId}`;

      await fetch(url, {
        method: "DELETE",
      });

      if (deleteType === "user") {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== deleteItemId)
        );
      } else if (deleteType === "truck") {
        setTrucks((prevTrucks) =>
          prevTrucks.filter((truck) => truck.id !== deleteItemId)
        );
      }

      // Reset modal and states
      setDeleteItemId(null);
      setDeleteType("");
      setDeleteModalOpen(false);

  
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete the item. Please try again.");
    }
  };

  const getCoveredPlaces = (routesID) => {
    const route = routes.find((route) => route.routesID === routesID);
    return route ? route.coveredPlaces : "No covered places found";
  };

  const handleEllipsisClick = (userId) => {
    // Toggle the visibility for the clicked user's menu
    setVisibleMenuId(visibleMenuId === userId ? null : userId);
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard-Trucks and Users</h1>
      </div>

      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => setModalOpen1(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Add Truck
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trucks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {trucks.map((truck) => (
    <div
      key={truck.truckId}
      className="relative bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-all duration-300 group"
    >
      {/* Original Content */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Plate: {truck.plateNumber}
        </h3>
        <p className="text-gray-600 mb-4">
          Description: {truck.description}
        </p>
        <p className="text-gray-600 mb-4">Username: {truck.username}</p>

        {/* Button Container with Flexbox */}
        <div className="flex space-x-4 mt-4">
          {/* Edit Button */}
          <button
            className="text-green-600"
            onClick={() => handleEditTruck(truck)}
          >
            Edit
          </button>

          {/* Delete Button */}
          <button
            onClick={() => {
              setDeleteItemId(truck.truckId);
              setDeleteType("truck");
              setDeleteModalOpen(true);
            }}
            className="text-red-600 hover:text-red-800 transition-colors text-sm font-semibold py-2 px-4 rounded-full border border-red-600 hover:bg-red-100"
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Hover Text */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 left-0 w-full bg-green-100 border border-green-300 shadow-lg rounded-lg mt-2 p-2 z-10">
        <h4 className="text-lg font-semibold text-green-800">Covered Places</h4>
        <p className="text-green-700">{getCoveredPlaces(truck.routesID)}</p>
      </div>
    </div>
  ))}
</div>

      </div>

      <div className="flex justify-end mb-6 space-x-4">
        <input
          id="search"
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-full md:w-96"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
        >
          Add User
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-2 text-gray-600">Username</th>
                <th className="text-left px-4 py-2 text-gray-600">Address</th>
                <th className="text-left px-4 py-2 text-gray-600">
                  Contact Number
                </th>
                <th className="text-left px-4 py-2 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2 text-gray-800">{user.username}</td>
                  <td className="px-4 py-2 text-gray-600">{user.address}</td>
                  <td className="px-4 py-2 text-gray-600">
                    {user.contactNumber}
                  </td>
                  <td className="px-4 py-2 flex justify-start items-center space-x-2">
                  <div className="flex items-center space-x-2">
      {/* Ellipsis */}
      <button
        onClick={() => handleEllipsisClick(user.userId)} // Show/hide menu for the specific user
        className="text-gray-600 hover:text-gray-800 transition-colors text-lg"
      >
        ...
      </button>

      {/* Conditionally render Trash Icon and Re-create Password Button for the specific user */}
      {visibleMenuId === user.userId && (
        <>
          <button
            onClick={() => {
              setDeleteItemId(user.userId);
              setDeleteType("user");
              setDeleteModalOpen(true);
            }}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
          <button
            onClick={() => openConfirmModal(user.userId)} // Pass the specific userId
            className="bg-green-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-green-700 transition-all text-sm"
            disabled={loadingStates[user.userId]} // Disable button for this user while loading
          >
            {loadingStates[user.userId]
              ? "Recreating..."
              : "Re-create Password"}
          </button>
        </>
      )}
    </div>
                  </td>
                </tr>
              ))}
              {errorMessage && (
                <tr>
                  <td colSpan="4" className="text-red-600 text-center py-2">
                    {errorMessage}
                  </td>
                </tr>
              )}
            </tbody>

            {/* Confirmation Modal */}
            <ConfirmationModal
              isOpen={confirmModalOpen}
              onConfirm={handleReCreatePassword} // Only re-create password for the selected user
              onCancel={closeConfirmModal}
            />
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-light-green p-8 rounded-xl shadow-2xl border-t-4 border-green-700 w-4/5 sm:w-1/2 lg:w-1/3"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-green-800 text-center">
              Add User
            </h3>
            <input
              name="firstname"
              placeholder="First Name"
              value={newUser.firstname}
              onChange={handleNewUserChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              name="lastname"
              placeholder="Last Name"
              value={newUser.lastname}
              onChange={handleNewUserChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleNewUserChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />

            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={newUser.contactNumber}
              onChange={handleNewUserChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              name="address"
              placeholder="Address"
              value={newUser.address}
              onChange={handleNewUserChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={saveNewUser}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Truck Modal */}
      {modalOpen1 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-light-green p-8 rounded-xl shadow-2xl border-t-4 border-green-700 w-4/5 sm:w-1/2 lg:w-1/3"
            style={{ backgroundColor: "#f0fdf4" }}
          >
            <h3 className="text-2xl font-bold mb-6 text-green-800 text-center">
              Add Truck
            </h3>
            <input
              name="username"
              placeholder="Username"
              value={newTruck.username}
              onChange={handleNewTruckChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              name="plateNumber"
              placeholder="Plate Number"
              value={newTruck.plateNumber}
              onChange={handleNewTruckChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <input
              name="description"
              placeholder="Description"
              value={newTruck.description}
              onChange={handleNewTruckChange}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            />
            <select
              value={routesId}
              onChange={(e) => setRoutesId(e.target.value)}
              className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6"
            >
              <option value="" disabled>
                Select Route
              </option>
              {routes.map((route) => (
                <option key={route.routesID} value={route.routesID}>
                  {route.routeName}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={saveNewTruck}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setModalOpen1(false)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={() => setDeleteModalOpen(false)} // Close modal on backdrop click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal click from closing
          >
            <h3 id="modal-title" className="text-xl font-semibold mb-4">
              Confirm Delete {deleteType}
            </h3>
            <p id="modal-description" className="text-gray-700 mb-6">
              Are you sure you want to delete this {deleteType}?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Truck Modal */}
      {editModalOpen && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
          style={{ zIndex: 1050 }}
        >
          <div
            className="bg-light-green p-8 rounded-xl shadow-2xl border-t-4 border-green-700"
            style={{ zIndex: 1060, backgroundColor: "#f0fdf4" }}
          >
            <h2 className="text-2xl font-bold mb-6 text-green-800 text-center">
              Edit Truck Details
            </h2>
            <label className="block mb-4">
              <span className="text-green-700 font-medium">Plate Number:</span>
              <input
                type="text"
                name="plateNumber"
                value={editTruckDetails.plateNumber}
                onChange={handleEditChange}
                className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>
            <label className="block mb-4">
              <span className="text-green-700 font-medium">Username:</span>
              <input
                type="text"
                name="username"
                value={editTruckDetails.username}
                onChange={handleEditChange}
                className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>
            <label className="block mb-4">
              <span className="text-green-700 font-medium">Description:</span>
              <input
                type="text"
                name="description"
                value={editTruckDetails.description}
                onChange={handleEditChange}
                className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </label>
            <label className="block mb-6">
              <span className="text-green-700 font-medium">Route:</span>
              <select
                value={editTruckDetails.routesID}
                onChange={(e) =>
                  handleEditChange({
                    target: { name: "routesID", value: e.target.value },
                  })
                }
                className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="" disabled>
                  Select Route
                </option>
                {routes.map((route) => (
                  <option key={route.routesID} value={route.routesID}>
                    {route.routeName}
                  </option>
                ))}
              </select>
            </label>
            <label className="block mb-6">
              <span className="text-green-700 font-medium">
                Re-create Password?
              </span>
              <div className="flex items-center">
                <label
                  htmlFor="toggle"
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    id="toggle"
                    type="checkbox"
                    checked={editTruckDetails.active} // Bind to active state
                    onChange={(e) =>
                      handleEditChange({
                        target: { name: "active", value: e.target.checked },
                      })
                    }
                    className="toggle-checkbox"
                  />
                  <span className="ml-2 text-green-700">Yes</span>
                </label>
              </div>
            </label>

            <div className="flex justify-end space-x-4">
              <button
                onClick={saveTruckChanges}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
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

export default DashboardUsers;
