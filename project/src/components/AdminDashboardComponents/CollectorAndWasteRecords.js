import React, { useState, useEffect } from "react";

// NavBar Component
const NavBar = ({ onNavClick }) => {
    return (
        <div className="flex justify-around bg-gray-800 p-4 text-white mb-4">
            <div
                className="cursor-pointer hover:text-gray-400"
                onClick={() => onNavClick("garbage")}
            >
                Garbage Volume Record
            </div>
            <div
                className="cursor-pointer hover:text-gray-400"
                onClick={() => onNavClick("permissions")}
            >
                Fuel Permission Releases Records
            </div>
            <div
                className="cursor-pointer hover:text-gray-400"
                onClick={() => onNavClick("absences")}
            >
                Absences
            </div>
        </div>
    );
};

const Records = () => {
    const [users, setUsers] = useState(() => {
        const storedUsers = localStorage.getItem("users");
        return storedUsers ? JSON.parse(storedUsers) : []; // Load users from localStorage
    });

    const [modalOpenforgarbage, setModalOpen1] = useState(false);
    const [modalOpenforrecords, setModalOpen2] = useState(false);

    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        index: null,
        number: "",
        date: "",
        picture: null,
    });
    const [newUser, setNewUser] = useState({
        number: "",
        date: "",
        picture: null,
    });
    const [selectedImage, setSelectedImage] = useState("");
    const [userToDeleteIndex, setUserToDeleteIndex] = useState(null); // Store index of user to delete
    const [activeSection, setActiveSection] = useState("garbage"); // Track the active section

    // Handle input change for number and date
    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    // Handle picture upload
    const handlePictureUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewUser((prev) => ({ ...prev, picture: reader.result }));
            };
            reader.readAsDataURL(file); // Convert file to Base64 string
        }
    };

    // Handle adding a new user
    const saveNewUser = () => {
        const newUserData = {
            firstname: "New",
            lastname: "User",
            status: "Pending",
            address: `Address ${newUser.number}`,
            date: newUser.date,
            number: newUser.number,
            picture: newUser.picture, // Store the Base64 image string
        };

        const updatedUsers = [...users, newUserData];
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage

        setModalOpen1(false); // Close modal after saving
        resetNewUser(); // Reset input fields
    };

    // Handle updating a user
    const updateUser = () => {
        const updatedUsers = [...users];
        updatedUsers[currentUser.index] = {
            ...updatedUsers[currentUser.index],
            number: currentUser.number,
            date: currentUser.date,
            picture: currentUser.picture, // Store the Base64 image string
        };

        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
        setUpdateModalOpen(false); // Close update modal
        resetCurrentUser(); // Reset current user state
    };

    // Reset new user state
    const resetNewUser = () => {
        setNewUser({ number: "", date: "", picture: null });
    };

    // Reset current user state
    const resetCurrentUser = () => {
        setCurrentUser({ index: null, number: "", date: "", picture: null });
    };

    // Delete user
    const deleteUser = () => {
        const updatedUsers = users.filter((_, i) => i !== userToDeleteIndex);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers)); // Save to localStorage
        setConfirmDeleteModalOpen(false); // Close confirmation modal
    };

    // Print function
    const printTable = async () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Users</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        img {
                            width: 200px; /* Increase width for printed images */
                            height: auto; /* Maintain aspect ratio */
                        }
                    </style>
                </head>
                <body>
                    <h1>Garbage Kilo Records</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Kilo</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${await Promise.all(users.map(async (user) => {
                                const imageHtml = user.picture ? `<img src="${user.picture}" alt="User" style="width: 200px; height: auto;"/>` : "No Picture";
                                return `
                                    <tr>
                                        <td>${user.date}</td>
                                        <td>${user.number}</td>
                                        <td>${imageHtml}</td>
                                    </tr>
                                `;
                            })).then(rows => rows.join(''))}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };
    const printTable1 = async () => {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Print Users</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                        img {
                            width: 200px; /* Increase width for printed images */
                            height: auto; /* Maintain aspect ratio */
                        }
                    </style>
                </head>
                <body>
                    <h1>Fuel Permission Releases</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Kilo</th>
                                <th>Picture</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${await Promise.all(users.map(async (user) => {
                                const imageHtml = user.picture ? `<img src="${user.picture}" alt="User" style="width: 200px; height: auto;"/>` : "No Picture";
                                return `
                                    <tr>
                                        <td>${user.date}</td>
                                        <td>${user.number}</td>
                                        <td>${imageHtml}</td>
                                    </tr>
                                `;
                            })).then(rows => rows.join(''))}
                        </tbody>
                    </table>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

    // Function to open the image in a modal
    const openImageModal = (url) => {
        setSelectedImage(url);
    };

    // Function to close the image modal
    const closeImageModal = () => {
        setSelectedImage("");
    };

    // Open update modal and populate data for the user being edited
    const openUpdateModal = (index) => {
        const user = users[index];
        setCurrentUser({
            index,
            number: user.number,
            date: user.date,
            picture: user.picture, // Store the Base64 image string for update
        });
        setUpdateModalOpen(true);
    };

    // Open confirmation modal
    const openConfirmDeleteModal = (index) => {
        setUserToDeleteIndex(index); // Store the index of the user to delete
        setConfirmDeleteModalOpen(true);
    };

    // Handle navigation clicks
    const handleNavClick = (section) => {
        setActiveSection(section);
    };

    return (
        <div className="p-4">
            {/* Top Navigation Bar */}
            <NavBar onNavClick={handleNavClick} />


            {/* Display content based on the selected section */}
            {activeSection === "garbage" && (
                <div>
                    <h2 className="text-lg font-semibold mb-2">Garbage Volume Record</h2>
                    {/* Add User Button */}
                    <button
                        onClick={() => setModalOpen1(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Add Record
                    </button>

                    {/* Print Button */}
                    <button
                        onClick={printTable}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-2"
                    >
                        Print
                    </button>

                    {/* Users Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead className="bg-gray-200 sticky top-0">
                                <tr>
                                    <th className="p-2 text-left">Date</th>
                                    <th className="p-2 text-left">Kilo</th>
                                    <th className="p-2 text-left">Picture</th>
                                    <th className="p-2 text-left">Actions</th> {/* Actions column added back */}
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-2">{user.date}</td>
                                        <td className="p-2">{user.number}</td>
                                        <td className="p-2 cursor-pointer" onClick={() => openImageModal(user.picture)}>
                                            {user.picture ? (
                                                <img src={user.picture} alt="User" className="h-24 w-24 object-cover" />
                                            ) : (
                                                "No Picture"
                                            )}
                                        </td>
                                        <td className="p-2">
                                            <button
                                                onClick={() => openUpdateModal(index)}
                                                className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                                            >
                                                Update
                                            </button>
                                            <button
                                                onClick={() => openConfirmDeleteModal(index)}
                                                className="bg-red-500 text-white px-2 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Content for Permissions */}
            {activeSection === "permissions" && (
                <div>
                <h2 className="text-lg font-semibold mb-2">Releases Records</h2>
                {/* Add User Button */}
                <button
                    onClick={() => setModalOpen2(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                >
                    Add Record
                </button>

                {/* Print Button */}
                <button
                    onClick={printTable}
                    className="bg-green-500 text-white px-4 py-2 rounded mb-4 ml-2"
                >
                    Print
                </button>

                {/* Users Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="p-2 text-left">Date</th>
                                <th className="p-2 text-left">Coverage</th>
                                <th className="p-2 text-left">Picture</th>
                                <th className="p-2 text-left">Actions</th> {/* Actions column added back */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{user.date}</td>
                                    <td className="p-2">{user.number}</td>
                                    <td className="p-2 cursor-pointer" onClick={() => openImageModal(user.picture)}>
                                        {user.picture ? (
                                            <img src={user.picture} alt="User" className="h-24 w-24 object-cover" />
                                        ) : (
                                            "No Picture"
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <button
                                            onClick={() => openUpdateModal(index)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => openConfirmDeleteModal(index)}
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            )}

            {/* Empty Div for Absences */}
            {activeSection === "absences" && (
                <div className="h-64 flex justify-center items-center border border-gray-300 rounded">
                    <p>No absences recorded.</p>
                </div>
            )}

            {/* Modal for Adding User */}
            {modalOpenforgarbage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Add Record</h2>

                        {/* Kilo Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Kilo:</label>
                            <input
                                type="text"
                                name="number"
                                value={newUser.number}
                                onChange={handleNewUserChange}
                                className="border rounded w-full py-2 px-3"
                                placeholder="Enter Kilo"
                            />
                        </div>

                        {/* Date Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={newUser.date}
                                onChange={handleNewUserChange}
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Picture Upload Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Picture:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePictureUpload}
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={saveNewUser}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setModalOpen1(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal for Adding User */}
            {modalOpenforrecords && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Add Record</h2>

                        {/* Kilo Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Cover:</label>
                            <input
                                type="text"
                                name="number"
                                value={newUser.number}
                                onChange={handleNewUserChange}
                                className="border rounded w-full py-2 px-3"
                                placeholder="Enter Kilo"
                            />
                        </div>

                        {/* Date Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={newUser.date}
                                onChange={handleNewUserChange}
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Picture Upload Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Picture:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePictureUpload}
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={saveNewUser}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setModalOpen2(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
            

            {/* Modal for Updating User */}
            {updateModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Update Record</h2>

                        {/* Kilo Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Kilo:</label>
                            <input
                                type="text"
                                name="number"
                                value={currentUser.number}
                                onChange={(e) =>
                                    setCurrentUser((prev) => ({ ...prev, number: e.target.value }))
                                }
                                className="border rounded w-full py-2 px-3"
                                placeholder="Enter Kilo"
                            />
                        </div>

                        {/* Date Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Date:</label>
                            <input
                                type="date"
                                name="date"
                                value={currentUser.date}
                                onChange={(e) =>
                                    setCurrentUser((prev) => ({ ...prev, date: e.target.value }))
                                }
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        {/* Picture Upload Field */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Picture:</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setCurrentUser((prev) => ({
                                                ...prev,
                                                picture: reader.result,
                                            }));
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="border rounded w-full py-2 px-3"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={updateUser}
                                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => setUpdateModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal for Deleting User */}
            {confirmDeleteModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this record?</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={deleteUser}
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setConfirmDeleteModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <img src={selectedImage} alt="User" className="w-full h-auto" />
                        <button
                            onClick={closeImageModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default  Records;
