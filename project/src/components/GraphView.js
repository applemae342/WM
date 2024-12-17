import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphView = () => {
    const [users, setUsers] = useState([]); // State to hold fetched users

    // Fetch the user data on component mount
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
    }, []); // Empty dependency array to run only once when the component mounts

    // Count the records - here we're counting the number of users fetched
    const userCount = users.length;

    // Expected value (1500)
    const expectedCount = 1500;

    const data = {
        labels: ["Registered Users"],
        datasets: [
            {
                label: "Actual Count",
                data: [userCount], // Use the fetched user count here
                backgroundColor: ["rgba(54, 162, 235, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)"],
                borderWidth: 1,
            },
        ],
    };

    // Options for the chart
    const options = {
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "User Registration and Collection Status",
            },
        },
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 1500, // Add a bit of space above the expected value
                title: {
                    display: true,
                    text: "Counts",
                },
            },
        },
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-center">User Registration and Collection Status</h2>
            <Bar data={data} options={options} />
            {/* Display user count and expected count below the chart */}
            <p className="mt-4 text-center">Total Registered Users: {userCount}</p>
            <p className="mt-2 text-center text-gray-500">Expected Users: {expectedCount}</p>
        </div>
    );
};

export default GraphView;
