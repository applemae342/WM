import React, { useEffect, useState } from "react";
import { TrashIcon } from "../heroIcons/Icons";

const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editRole, setEditRole] = useState(null); // To track which user is being edited
    const [updatedRole, setUpdatedRole] = useState(""); // To track the new role

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/API/users"); // Adjust if necessary
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
        setEditRole(userId); // Set the user being edited
        setUpdatedRole(currentRole); // Set the current role
    };

    const handleRoleChange = (event) => {
        setUpdatedRole(event.target.value); // Update the role when the dropdown changes
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
                setEditRole(null); // Exit edit mode after saving
                const updatedUsers = users.map(user =>
                    user.userId === userId ? { ...user, role: updatedRole } : user
                );
                setUsers(updatedUsers); // Update users state with the new role
            } else {
                alert("Failed to update role");
            }
        } catch (error) {
            console.error("Error updating role:", error);
            alert("Error updating role");
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Users List</h1>
                <div>
                    <label htmlFor="search" className="sr-only">
                        Search User
                    </label>
                    <input
                        id="search"
                        type="text"
                        className="border border-gray-300 rounded-lg p-2"
                        placeholder="Search User"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="p-2 text-left">Username</th>
                                <th className="p-2 text-left">Contact Number</th>
                                <th className="p-2 text-left">Email</th>
                                <th className="p-2 text-left">Specific Street or Sitio</th>
                                <th className="p-2 text-left">Role</th>
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{user.username}</td>
                                    <td className="p-2">{user.contactNumber}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.address}</td>
                                    <td className="p-2">
                                        {editRole === user.userId ? (
                                            <select
                                                value={updatedRole}
                                                onChange={handleRoleChange}
                                                className="border border-gray-300 rounded-lg p-1"
                                            >
                                                <option value="resident">Resident</option>
                                                <option value="admin">Admin</option>
                                                <option value="collector">Collector</option>
                                            </select>
                                        ) : (
                                            <>
                                                {user.role}
                                                <button
                                                    onClick={() => handleEditRole(user.userId, user.role)}
                                                    className="ml-2 text-blue-500 hover:text-blue-700"
                                                >
                                                    Edit
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        {editRole === user.userId ? (
                                            <button
                                                onClick={() => saveRole(user.userId)}
                                                className="text-green-500 hover:text-green-700"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => alert(`Deleting ${user.username}`)}
                                                className="text-red-500 hover:text-red-700"
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
            </div>
        </div>
    );
};

export default DashboardUsers;
