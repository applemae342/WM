import React, { useEffect, useState } from "react";
import { TrashIcon } from "../heroIcons/Icons";
import axios from "axios";

const DashboardUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editRole, setEditRole] = useState(null);
  const [updatedRole, setUpdatedRole] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
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
  const [hoveredTruck, setHoveredTruck] = useState(null); // State for hovered truck

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
      const response = await axios.get("http://localhost:8000/API/RegisterTruck/getAll");
      setTrucks(response.data);
    };

    fetchTrucks();
    fetchRoutes();
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        setUsers([...users, addedUser.user]); // Adjust based on your response structure
        setModalOpen(false);
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
        body: JSON.stringify({ ...newTruck, routesID: routesId }), // Include selected route ID
      });
      if (response.ok) {
        const addedTruck = await response.json();
        // Update the trucks state with the newly added truck
        setTrucks((prevTrucks) => [...prevTrucks, addedTruck]);
        alert("Truck added successfully");
        setModalOpen1(false);
        // Reset newTruck state
        setNewTruck({
          plateNumber: "",
          description: "",
          routesID: "",
          password: "default",
        });
        setRoutesId(""); // Reset routesId as well
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to add truck");
      }
    } catch (error) {
      console.error("Error adding truck:", error);
      alert("Error adding truck");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Truck List</h1>
        <div className="flex items-center gap-2">
          <input
            id="search"
            type="text"
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Search User"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setModalOpen1(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Truck
          </button>
        </div>
      </div>

      {/* New Table Above Truck List */}
      <div className="overflow-x-auto shadow-md rounded-lg mb-6">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-medium text-gray-600">Plate Number</th>
              <th className="p-4 text-left font-medium text-gray-600">Description</th>
              <th className="p-4 text-left font-medium text-gray-600">Covered Places</th>
            </tr>
          </thead>
          <tbody>
            {trucks.map((truck) => {
              const route = routes.find((r) => r.routesID === truck.routesID); // Find the matching route
              return (
                <tr key={truck.id}>
                  <td>{truck.plateNumber}</td>
                  <td>{truck.description}</td>
                  <td 
                    onMouseEnter={() => setHoveredTruck(truck)} 
                    onMouseLeave={() => setHoveredTruck(null)}
                    className="relative"
                  >
                    {route ? route.routeName : "N/A"}
                    {hoveredTruck === truck && (
                      <div className="absolute left-0 z-10 p-2 bg-gray-200 rounded shadow-lg">
                        {route ? `Covered Places: ${route.coveredPlaces}` : "No covered places"}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Existing Users List Table */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Users List</h1>
        <div className="flex items-center gap-2">
          <input
            id="search"
            type="text"
            className="border border-gray-300 rounded-lg p-2"
            placeholder="Search User"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add User
          </button>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left font-medium text-gray-600">Username</th>
              <th className="p-4 text-left font-medium text-gray-600">Contact Number</th>
              <th className="p-4 text-left font-medium text-gray-600">Specific Street or Sitio</th>
              <th className="p-4 text-left font-medium text-gray-600">Email</th>
              <th className="p-4 text-left font-medium text-gray-600">Role</th>
              <th className="p-4 text-left font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.contactNumber}</td>
                <td className="p-4">{user.address}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {editRole === user.id ? (
                    <input
                      type="text"
                      value={updatedRole}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                      onBlur={() => setEditRole(null)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          // Handle role update here
                          console.log("Update Role:", user.id, updatedRole);
                          setEditRole(null);
                        }
                      }}
                      className="border border-gray-300 rounded-lg p-1"
                    />
                  ) : (
                    <span onClick={() => { setEditRole(user.id); setUpdatedRole(user.role); }}>{user.role}</span>
                  )}
                </td>
                <td className="p-4">
                  <button
                    onClick={() => {
                      // Handle delete user action
                      console.log("Delete User:", user.id);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Add New User
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block mb-1 font-medium">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={newUser.firstname}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={newUser.lastname}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="text"
                  name="email"
                  value={newUser.email}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Contact Number</label>
                <input
                  type="text"
                  name="contactNumber"
                  value={newUser.contactNumber}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newUser.address}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 font-medium">Role</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleNewUserChange}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                >
                  <option value="collector">Collector</option>
                  <option value="resident">Resident</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={saveNewUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Truck Modal */}
      {modalOpen1 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Add Truck</h2>
            <input
              type="text"
              name="plateNumber"
              value={newTruck.plateNumber}
              onChange={handleNewTruckChange}
              placeholder="Plate Number"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            />
            <input
              type="text"
              name="description"
              value={newTruck.description}
              onChange={handleNewTruckChange}
              placeholder="Description"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            />
            <select
              name="routesID"
              value={routesId}
              onChange={(e) => setRoutesId(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route.routesID} value={route.routesID}>
                  {route.routeName}
                </option>
              ))}
            </select>
            <button
              onClick={saveNewTruck}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Truck
            </button>
            <button
              onClick={() => setModalOpen1(false)}
              className="ml-2 text-gray-600 hover:text-gray-800"
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
