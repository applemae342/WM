import React, { useEffect, useState } from "react";
import { TrashIcon } from "../heroIcons/Icons";

const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editRole, setEditRole] = useState(null);
    const [updatedRole, setUpdatedRole] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        firstname: "",
        lastname: "",
        username: "",
        contactNumber: "",
        address: "",
        email: "", // Added email field
        password: "defaultPassword123", // Default password
        role: "collector", // Default role
    });

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

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
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
                            <tr key={index} className="border-b">
                                <td className="p-4">{user.username}</td>
                                <td className="p-4">{user.contactNumber}</td>
                                <td className="p-4">{user.address}</td>
                                <td className="p-4">{user.email}</td> {/* Display email */}
                                <td className="p-4">
                                    {editRole === user.userId ? (
                                        <select
                                            value={updatedRole}
                                            onChange={handleRoleChange}
                                            className="border border-gray-300 rounded-lg p-1"
                                        >
                                            <option value="admin">Admin</option>
                                            <option value="collector">Collector</option>
                                            <option value="resident">Resident</option>
                                        </select>
                                    ) : (
                                        <>
                                            {user.role}
                                            <button
                                                onClick={() => handleEditRole(user.userId, user.role)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </button>
                                        </>
                                    )}
                                </td>
                                <td className="p-4">
                                    {editRole === user.userId ? (
                                        <button
                                            onClick={() => saveRole(user.userId)}
                                            className="text-green-600 hover:text-green-800"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => alert(`Deleting ${user.username}`)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <TrashIcon />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-6 text-gray-800">Add New User</h2>
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
                                <label className="block mb-1 font-medium">Email</label> {/* Email input field */}
                                <input
                                    type="email"
                                    name="email"
                                    value={newUser.email}
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
                                    <option value="admin">Admin</option>
                                    <option value="collector">Collector</option>
                                    <option value="resident">Resident</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={saveNewUser}
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                                Save User
                            </button>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="ml-4 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
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
