import React from "react";
import { TrashIcon } from "../heroIcons/Icons"; // Assuming TrashIcon is a component

const dummyUsers = [
    {
        username: "john_doe",
        contactNumber: "123-456-7890",
        email: "john.doe@example.com",
        address: "123 Elm Street",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    {
        username: "jane_smith",
        contactNumber: "987-654-3210",
        email: "jane.smith@example.com",
        address: "456 Oak Avenue",
    },
    // Add more users as needed
];

const DashboardUsers = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Users List</h1>
                <div>
                    <label htmlFor="search" className="sr-only">
                        Search User
                    </label>
                    <input id="search" type="text" className="border border-gray-300 rounded-lg p-2" placeholder="Search User" />
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
                                <th className="p-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyUsers.map((user, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{user.username}</td>
                                    <td className="p-2">{user.contactNumber}</td>
                                    <td className="p-2">{user.email}</td>
                                    <td className="p-2">{user.address}</td>
                                    <td className="p-2">
                                        <button onClick={() => alert(`Deleting ${user.username}`)} className="text-red-500 hover:text-red-700">
                                            <TrashIcon />
                                        </button>
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
