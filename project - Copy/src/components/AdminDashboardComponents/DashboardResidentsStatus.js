import React from "react";
import { EyeIcon } from "../heroIcons/Icons";

// Sample data for demonstration
const dummyData = [
    {
        name: "John Doe",
        status: "Pending",
        address: "123 Elm Street",
        lastCollectionDate: "2024-08-01",
        nextCollectionDate: "2024-08-30",
    },
    {
        name: "Jane Smith",
        status: "Completed",
        address: "456 Oak Avenue",
        lastCollectionDate: "2024-07-20",
        nextCollectionDate: "2024-08-25",
    },
    {
        name: "Alice Johnson",
        status: "Pending",
        address: "789 Pine Road",
        lastCollectionDate: "2024-07-15",
        nextCollectionDate: "2024-08-10",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },
    {
        name: "Bob Brown",
        status: "Overdue",
        address: "321 Maple Drive",
        lastCollectionDate: "2024-06-30",
        nextCollectionDate: "2024-07-15",
    },

    // Add more data as needed
];

const DashboardResidentsStatus = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold">Residents Status</p>
                <p>Total of all Pending Collection: 20</p>
            </div>
            <div className="overflow-x-auto">
                <div className="max-h-[400px] overflow-y-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="p-2 text-left">Name</th>
                                <th className="p-2 text-left">Status</th>
                                <th className="p-2 text-left">Address</th>
                                <th className="p-2 text-left">Last Collection Date</th>
                                <th className="p-2 text-left">Next Collection Date</th>
                                <th className="p-2 text-left">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dummyData.map((resident, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{resident.name}</td>
                                    <td className="p-2">{resident.status}</td>
                                    <td className="p-2">{resident.address}</td>
                                    <td className="p-2">{resident.lastCollectionDate}</td>
                                    <td className="p-2">{resident.nextCollectionDate}</td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => alert(`Viewing details for ${resident.name}`)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <EyeIcon />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-10">
                    <div>
                        <p>Set New Collection Date</p>
                    </div>
                    <form>
                        <div className="flex items-center gap-5">
                            <div>
                                <label htmlFor="quantity" className="mr-2 text-sm font-medium text-gray-700">
                                    Select Address:
                                </label>
                                <select id="quantity" className="border border-gray-300 rounded-lg p-2 bg-white  outline-none">
                                    <option value="" disabled selected>
                                        List of Address
                                    </option>
                                    <option value="1">Cebu</option>
                                    <option value="2">Bohol</option>
                                    <option value="3">Negros</option>
                                    <option value="4">Lanao</option>
                                    <option value="5">Boljoon</option>
                                </select>
                            </div>
                            <div className="">
                                <input type="date" />
                            </div>
                            <div>
                                <button className="border border-blue-500 p-1 text-white bg-blue-500 rounded-md w-[100px]">Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DashboardResidentsStatus;
