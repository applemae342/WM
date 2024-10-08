import React, { useState } from "react";
import { AddIcon, ElipsisIcon } from "../heroIcons/Icons";

const Announcements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        body: "",
    });
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncementIndex, setEditingAnnouncementIndex] = useState(null); // To track which announcement is being edited
    const [dropdownIndex, setDropdownIndex] = useState(null); // To track which dropdown is open

    const handleAddOrEditAnnouncement = () => {
        const { title, body } = newAnnouncement;
        if (title.trim() && body.trim()) {
            if (editingAnnouncementIndex !== null) {
                // Update existing announcement
                const updatedAnnouncements = [...announcements];
                updatedAnnouncements[editingAnnouncementIndex] = {
                    ...updatedAnnouncements[editingAnnouncementIndex],
                    title: title.trim(),
                    body: body.trim(),
                };
                setAnnouncements(updatedAnnouncements);
            } else {
                // Add new announcement
                const newAnn = {
                    title: title.trim(),
                    body: body.trim(),
                    time: new Date().toLocaleString(), // Store the current date and time
                };
                setAnnouncements([newAnn, ...announcements]); // Add the new announcement to the top
            }
            setNewAnnouncement({ title: "", body: "" }); // Reset fields
            setIsModalOpen(false);
            setEditingAnnouncementIndex(null); // Reset editing index
        }
    };

    const handleEditAnnouncement = (announcement, index) => {
        setNewAnnouncement({
            title: announcement.title,
            body: announcement.body,
        });
        setEditingAnnouncementIndex(index);
        setIsModalOpen(true); // Open the modal for editing
        setDropdownIndex(null); // Close dropdown on edit
    };

    const handleDeleteAnnouncement = (index) => {
        const filteredAnnouncements = announcements.filter((_, i) => i !== index);
        setAnnouncements(filteredAnnouncements);
        setDropdownIndex(null); // Close dropdown on delete
    };

    return (
        <div className="announcements-container p-5">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold">Add Announcements</h1>
            </header>
            <div className="flex justify-end mb-5">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setNewAnnouncement({ title: "", body: "" }); // Reset fields for new announcement
                        setEditingAnnouncementIndex(null); // Clear editing state
                    }}
                    aria-label="Add New Announcement"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                >
                    <AddIcon />
                    <span className="ml-2">Add Announcement</span>
                </button>
            </div>

            {/* List of Announcements */}
            <div className="announcements-list">
                {announcements.length === 0 ? (
                    <p>No announcements added yet.</p>
                ) : (
                    <div className="list-disc pl-5">
                        {announcements.map((announcement, index) => (
                            <div key={index} className="py-3 px-4 mb-2 border relative">
                                <div className="absolute top-0 right-0">
                                    <button
                                        onClick={() => {
                                            // Toggle dropdown visibility
                                            setDropdownIndex(dropdownIndex === index ? null : index);
                                        }}
                                    >
                                        <ElipsisIcon />
                                    </button>
                                    {/* Dropdown for Edit/Delete */}
                                    {dropdownIndex === index && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                            <button
                                                onClick={() => handleEditAnnouncement(announcement, index)} // Pass index for editing
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAnnouncement(index)} // Pass index for deleting
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold">{announcement.title}</h3>
                                <p className="text-gray-700">{announcement.body}</p>
                                <p className="text-gray-500 text-sm">{announcement.time}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal for Adding/Editing Announcement */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-5 w-1/3">
                        <h2 className="text-lg font-semibold mb-4">
                            {editingAnnouncementIndex !== null ? "Edit Announcement" : "Add New Announcement"}
                        </h2>
                        <input
                            type="text"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                            placeholder="Enter title"
                            className="border border-gray-300 p-2 w-full rounded mb-4"
                        />
                        <textarea
                            value={newAnnouncement.body}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
                            placeholder="Enter announcement body"
                            className="border border-gray-300 p-2 w-full rounded mb-4"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleAddOrEditAnnouncement} className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
                                {editingAnnouncementIndex !== null ? "Update Announcement" : "Add Announcement"}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-2 bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400"
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

export default Announcements;
