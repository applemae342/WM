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
    password: "defaultPassword123",
    role: "collector",
  });

  const [newTruck, setNewTruck] = useState({
    plateNumber: "",
    description: "",
    password: "default",
    routesID: "",
  });

  const [routes, setRoutes] = useState([]);
  const [routesId, setRoutesId] = useState("");
  const [hoveredTruck, setHoveredTruck] = useState(null);

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
        setRoutes(response.data);
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
        setUsers([...users, addedUser.user]);
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

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/API/deleteUser/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId));
        alert("User deleted successfully");
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Truck List</h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <input
            id="search"
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full md:w-auto"
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
              const route = routes.find((r) => r.routesID === truck.routesID);
              return (
                <tr key={truck.id}>
                  <td className="p-4">{truck.plateNumber}</td>
                  <td className="p-4">{truck.description}</td>
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

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Users List</h1>
        <div className="flex flex-col md:flex-row items-center gap-2">
          <input
            id="search"
            type="text"
            className="border border-gray-300 rounded-lg p-2 w-full md:w-auto"
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
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.contactNumber}</td>
                <td className="p-4">{user.address}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  {editRole === user.id ? (
                    <select
                      value={updatedRole}
                      onChange={(e) => setUpdatedRole(e.target.value)}
                      className="border border-gray-300 rounded-lg p-1"
                    >
                      <option value="collector">Collector</option>
                      <option value="admin">Admin</option>
                      {/* Add more roles as needed */}
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td className="p-4 flex space-x-2">
                  <button
                    onClick={() => {
                      if (editRole === user.id) {
                        // Save role update logic here
                        setEditRole(null);
                      } else {
                        setEditRole(user.id);
                        setUpdatedRole(user.role);
                      }
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    {editRole === user.id ? "Save" : "Edit Role"}
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:underline"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New User</h2>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newUser.firstname}
              onChange={handleNewUserChange}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newUser.lastname}
              onChange={handleNewUserChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newUser.username}
              onChange={handleNewUserChange}
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newUser.contactNumber}
              onChange={handleNewUserChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newUser.address}
              onChange={handleNewUserChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newUser.email}
              onChange={handleNewUserChange}
            />
            <button
              onClick={saveNewUser}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add User
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {modalOpen1 && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">Add New Truck</h2>
            <input
              type="text"
              name="plateNumber"
              placeholder="Plate Number"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newTruck.plateNumber}
              onChange={handleNewTruckChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              className="border border-gray-300 rounded-lg p-2 mb-2 w-full"
              value={newTruck.description}
              onChange={handleNewTruckChange}
            />
            <select
              value={routesId}
              onChange={(e) => setRoutesId(e.target.value)}
              className="border border-gray-300 rounded-lg p-1 mb-2 w-full"
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
              Add Truck
            </button>
            <button
              onClick={() => setModalOpen1(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2"
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
