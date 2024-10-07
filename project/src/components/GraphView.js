import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraphView = () => {
    const data = {
        labels: ["Registered Users", "Collected", "Pending"],
        datasets: [
            {
                label: "Counts",
                data: [1000, 150, 75],
                backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(255, 159, 64, 0.2)"],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 159, 64, 1)"],
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
        </div>
    );
};

export default GraphView;
