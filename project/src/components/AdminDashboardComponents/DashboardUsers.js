import React, { useEffect, useState } from "react";
import { TrashIcon } from "../heroIcons/Icons";
import axios from "axios";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRole, setEditRole] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // Add User modal
  const [modalOpen1, setModalOpen1] = useState(false); // Add Truck modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteType, setDeleteType] = useState(""); // Type of item being deleted (user or truck)
  const [trucks, setTrucks] = useState([]);
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    username: "",
    contactNumber: "",
    address: "",
    email: "",
    password: "defaultPassword123", // Default password
    role: "collector", // Default role
  });

  const [newTruck, setNewTruck] = useState({
    plateNumber: "",
    description: "",
    password: "default",
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
        const response = await axios.get("http://localhost:8000/API/Route/getAll");
        setRoutes(response.data); // Set fetched routes
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    const fetchTrucks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/API/RegisterTruck/getAll");
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

  const handleEditRole = (userId, currentRole) => {
    setEditRole(userId);
    setUpdatedRole(currentRole);
  };

  const handleRoleChange = (event) => {
    setUpdatedRole(event.target.value);
  };

  const saveRole = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/API/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: updatedRole }),
      });
      if (response.ok) {
        alert("Role updated successfully");
        const updatedUsers = users.map((user) =>
          user.userId === userId ? { ...user, role: updatedRole } : user
        );
        setUsers(updatedUsers);
        setEditRole(null);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error updating role");
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
          email: "",
          password: "defaultPassword123",
          role: "collector",
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
      const response = await fetch("http://localhost:8000/API/RegisterTruck/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTruck, routesID: routesId }),
      });
      if (response.ok) {
        const addedTruck = await response.json();
        setTrucks((prevTrucks) => [...prevTrucks, addedTruck]);
        alert("Truck added successfully");
        setModalOpen1(false);
        setNewTruck({
          plateNumber: "",
          description: "",
          routesID: "",
          password: "default",
        });
        setRoutesId("");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add truck");
      }
    } catch (error) {
      console.error("Error adding truck:", error);
      alert("Error adding truck");
    }
  };

  const handleDelete = async () => {
    try {
      let response;
      if (deleteType === "user") {
        response = await axios.delete(`http://localhost:8000/API/users/${deleteItemId}`);
      } else if (deleteType === "truck") {
        response = await axios.delete(`http://localhost:8000/API/RegisterTruck/delete/${deleteItemId}`);
      }

      if (response && response.status === 200) {
        alert(`${deleteType === "user" ? "User" : "Truck"} deleted successfully.`);
        if (deleteType === "user") {
          setUsers(users.filter((user) => user.id !== deleteItemId));
        } else {
          setTrucks(trucks.filter((truck) => truck.id !== deleteItemId));
        }
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item");
    } finally {
      setDeleteModalOpen(false);
      setDeleteItemId(null);
      setDeleteType("");
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-800">Dashboard-Trucks and Users</h1>
        <input
          id="search"
          type="text"
          className="border border-gray-300 rounded-lg p-3 w-full md:w-96"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => setModalOpen1(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Add Truck
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Trucks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <div key={truck.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-gray-800">Plate: {truck.plateNumber}</h3>
              <p className="text-gray-600">Description: {truck.description}</p>
              <button
                onClick={() => {
                  setDeleteItemId(truck.id);
                  setDeleteType("truck");
                  setDeleteModalOpen(true);
                }}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end mb-6 space-x-4">
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all"
        >
          Add User
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Users</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-all">
              <h3 className="text-lg font-semibold text-gray-800">{user.username}</h3>
              <p className="text-gray-600">Role: {user.role}</p>
              {editRole === user.userId ? (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={updatedRole}
                    onChange={handleRoleChange}
                    className="border border-gray-300 p-1 rounded-md"
                  />
                  <button
                    onClick={() => saveRole(user.userId)}
                    className="bg-blue-600 text-white px-2 py-1 rounded-lg"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => handleEditRole(user.userId, user.role)}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md"
                  >
                    Edit Role
                  </button>
                  <button
                    onClick={() => {
                      setDeleteItemId(user.id);
                      setDeleteType("user");
                      setDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <TrashIcon />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add User</h3>
            <input
              name="firstname"
              placeholder="First Name"
              value={newUser.firstname}
              onChange={handleNewUserChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              name="lastname"
              placeholder="Last Name"
              value={newUser.lastname}
              onChange={handleNewUserChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={handleNewUserChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              name="email"
              placeholder="Email"
              value={newUser.email}
              onChange={handleNewUserChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              name="contactNumber"
              placeholder="Contact Number"
              value={newUser.contactNumber}
              onChange={handleNewUserChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              name="address"
              placeholder="Address"
              value={newUser.address}
              onChange={handleNewUserChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <button
              onClick={saveNewUser}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add Truck Modal */}
      {modalOpen1 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Add Truck</h3>
            <input
              name="plateNumber"
              placeholder="Plate Number"
              value={newTruck.plateNumber}
              onChange={handleNewTruckChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <input
              name="description"
              placeholder="Description"
              value={newTruck.description}
              onChange={handleNewTruckChange}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            />
            <select
              value={routesId}
              onChange={(e) => setRoutesId(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-full mb-2"
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>
            <button
              onClick={saveNewTruck}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setModalOpen1(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold mb-4">Are you sure you want to delete this {deleteType}?</p>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg mr-2"
            >
              Delete
            </button>
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardUsers;
