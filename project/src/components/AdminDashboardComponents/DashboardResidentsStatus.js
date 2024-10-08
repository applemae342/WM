import React, { useEffect, useState } from "react";

const DashboardUsers = () => {
    const [users, setUsers] = useState([]);
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/API/users");
                const usersData = await response.json();
                setUsers(usersData);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        // Fetch statuses from the API
        const fetchStatuses = async () => {
            try {
                const response = await fetch("http://localhost:8000/API/Status/getAll");
                const statusData = await response.json();
                setStatuses(statusData);
            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };

        // Fetch both users and statuses on component mount
        fetchUsers();
        fetchStatuses();
    }, []);

    // Match users with statuses by userID from ResidentStatus and userId from User
    const usersWithStatus = users.map((user) => {
        const userStatus = statuses.find((status) => status.userID === user.userId); // Matching userID from status and userId from user
        return {
            ...user,
            status: userStatus ? userStatus.statusName : "No Status", // Use statusName for the status field
        };
    });

    return (
        <div className="p-4">
            <h1 className="text-xl font-semibold mb-4">Users and Statuses</h1>
            <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersWithStatus.map((user, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{`${user.firstname} ${user.lastname}`}</td>
                                    <td className="p-2">{user.status}</td>
                                    <td className="p-2">{user.address}</td>
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
