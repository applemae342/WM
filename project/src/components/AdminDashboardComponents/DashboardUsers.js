import React, { useEffect, useState } from "react";
import { TrashIcon } from "../heroIcons/Icons";
import axios from 'axios';

const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editRole, setEditRole] = useState(null);
    const [updatedRole, setUpdatedRole] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false); // Added modal for trucks
    const [newUser, setNewUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        contactNumber: "",
        address: "",
        email: "", // Added email field
        password: "default", // Default password
        role: "admin", // Default role
    });
    const [newTruck, setNewTruck] = useState({
        plateNumber: "",
        description: "",
        routesID: "",
        password: "default",
    });
    const [trucks, setTrucks] = useState([]); // State for trucks
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

    const filteredUsers = users.filter(user =>
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
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ role: updatedRole })
            });
            if (response.ok) {
                alert("Role updated successfully");
                const updatedUsers = users.map(user =>
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
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const saveNewUser = async () => {
        try {
            const response = await fetch("http://localhost:8000/API/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
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
                setTrucks((prevTrucks) => [...prevTrucks, addedTruck]); // Update the trucks state with the newly added truck
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
    const saveUpdatedTruck = async () => {
      try {
          const response = await fetch(`http://localhost:8000/API/RegisterTruck/${editTruckId}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedTruck)
          });
          if (response.ok) {
              alert("Truck updated successfully");
              const updatedTrucks = trucks.map(truck =>
                  truck.id === editTruckId ? { ...truck, ...updatedTruck } : truck
              );
              setTrucks(updatedTrucks);
              setEditTruckId(null);
          } else {
              const errorData = await response.json();
              alert(errorData.message || "Failed to update truck");
          }
      } catch (error) {
          console.error("Error updating truck:", error);
          alert("Error updating truck");
      }
  };

  // Function to delete truck
  const deleteTruck = async (truckId) => {
      try {
          const response = await fetch(`http://localhost:8000/API/RegisterTruck/${truckId}`, {
              method: 'DELETE'
          });
          if (response.ok) {
              setTrucks(trucks.filter(t => t.id !== truckId));
              alert("Truck deleted successfully");
          } else {
              const errorData = await response.json();
              alert(errorData.message || "Failed to delete truck");
          }
      } catch (error) {
          console.error("Error deleting truck:", error);
          alert("Error deleting truck");
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
              <th className="p-4 text-left font-medium text-gray-600">Actions</th>

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
                                    <td className="p-4 flex space-x-2">
                                        <button
                                            onClick={() => saveUpdatedTruck (truck)} // Assuming you want to add the truck here
                                            className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTruck(truck.id)} // Delete action
                                            className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                                        >
                                            <TrashIcon />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
        </table>
      </div>


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
                            <th className="p-4 text-left font-medium text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user) => (
                            <tr key={user.userId}>
                                <td className="p-4">{user.username}</td>
                                <td className="p-4">{user.contactNumber}</td>
                                <td className="p-4">{user.address}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    {editRole === user.userId ? (
                                        <select
                                            value={updatedRole}
                                            onChange={handleRoleChange}
                                            className="border border-gray-300 rounded-md p-1"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="collector">Collector</option>
                                            <option value="resident">Resident</option>
                                        </select>
                                    ) : (
                                        user.role
                                    )}
                                </td>
                                <td className="p-4 flex space-x-2">
                                    {editRole === user.userId ? (
                                        <button
                                            onClick={() => saveRole(user.userId)}
                                            className="bg-green-600 text-white px-2 py-1 rounded-md hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEditRole(user.userId, user.role)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                                        >
                                            Edit
                                        </button>
                                    )}
                                    <button
                                        onClick={async () => {
                                            try {
                                                const response = await fetch(`http://localhost:8000/API/users/${user.userId}`, {
                                                    method: 'DELETE'
                                                });
                                                if (response.ok) {
                                                    setUsers(users.filter(u => u.userId !== user.userId));
                                                    alert("User deleted successfully");
                                                } else {
                                                    const errorData = await response.json();
                                                    alert(errorData.message || "Failed to delete user");
                                                }
                                            } catch (error) {
                                                console.error("Error deleting user:", error);
                                                alert("Error deleting user");
                                            }
                                        }}
                                        className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                                    >
                                        <TrashIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Adding User */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-semibold">Add New User</h2>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            value={newUser.firstname}
                            onChange={handleNewUserChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            value={newUser.lastname}
                            onChange={handleNewUserChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleNewUserChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="contactNumber"
                            placeholder="Contact Number"
                            value={newUser.contactNumber}
                            onChange={handleNewUserChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={newUser.address}
                            onChange={handleNewUserChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={handleNewUserChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <button
                            onClick={saveNewUser}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            Add User
                        </button>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Modal for Adding Truck */}
            {modalOpen1 && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h2 className="text-xl font-semibold">Add New Truck</h2>
                        <input
                            type="text"
                            name="plateNumber"
                            placeholder="Plate Number"
                            value={newTruck.plateNumber}
                            onChange={handleNewTruckChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Description"
                            value={newTruck.description}
                            onChange={handleNewTruckChange}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                        />
                        <select
                            name="routesID"
                            value={routesId}
                            onChange={(e) => setRoutesId(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
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
                            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
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
