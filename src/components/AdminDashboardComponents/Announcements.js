import React, { useEffect, useState } from "react";
import { AddIcon, ElipsisIcon } from "../heroIcons/Icons";

const Announcements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        body: "",
    });
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncementId, setEditingAnnouncementId] = useState(null); // To track which announcement is being edited
    const [dropdownIndex, setDropdownIndex] = useState(null); // To track which dropdown is open
    const [feedbackMessage, setFeedbackMessage] = useState("");

    // Fetch announcements on component mount
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch("http://localhost:8000/API/Announcements/getAll");
                const data = await response.json();
                setAnnouncements(data);
            } catch (error) {
                console.error("Error fetching announcements:", error);
            }
        };

        fetchAnnouncements();
    }, []);

    const displayFeedbackMessage = (message) => {
        setFeedbackMessage(message);
        setTimeout(() => {
            setFeedbackMessage("");
        }, 3000); // Clear the message after 3 seconds
    };

    const handleAddOrEditAnnouncement = async () => {
        const { title, body } = newAnnouncement;
        if (title.trim() && body.trim()) {
            if (editingAnnouncementId) {
                // Update existing announcement
                try {
                    const response = await fetch(`http://localhost:8000/API/Announcements/update/${editingAnnouncementId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            announcementsTitle: title.trim(),
                            announcementBody: body.trim(),
                        }),
                    });

                    if (response.ok) {
                        const updatedAnnouncement = await response.json();
                        setAnnouncements((prevAnnouncements) =>
                            prevAnnouncements.map((ann) =>
                                ann.announcementsID === updatedAnnouncement.announcementsID ? updatedAnnouncement : ann
                            )
                        );
                        displayFeedbackMessage("Announcement updated successfully!");
                    }
                } catch (error) {
                    console.error("Error updating announcement:", error);
                }
            } else {
                // Add new announcement
                const newAnn = {
                    announcementsTitle: title.trim(),
                    announcementBody: body.trim(),
                    userID: "your-user-id-here", // Replace with actual user ID if necessary
                };

                try {
                    const response = await fetch("http://localhost:8000/API/Announcements/create", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newAnn),
                    });

                    if (response.ok) {
                        const addedAnnouncement = await response.json();
                        setAnnouncements([addedAnnouncement, ...announcements]); // Add the new announcement to the top
                        displayFeedbackMessage("Announcement added successfully!");
                    }
                } catch (error) {
                    console.error("Error adding announcement:", error);
                }
            }

            setNewAnnouncement({ title: "", body: "" }); // Reset fields
            setIsModalOpen(false);
            setEditingAnnouncementId(null); // Reset editing ID
        }
    };

    const handleEditAnnouncement = (announcement) => {
        setNewAnnouncement({
            title: announcement.announcementsTitle,
            body: announcement.announcementBody,
        });
        setEditingAnnouncementId(announcement.announcementsID);
        setIsModalOpen(true); // Open the modal for editing
        setDropdownIndex(null); // Close dropdown on edit
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        try {
            const response = await fetch(`http://localhost:8000/API/Announcements/delete/${announcementId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAnnouncements((prevAnnouncements) =>
                    prevAnnouncements.filter((ann) => ann.announcementsID !== announcementId)
                );
                displayFeedbackMessage("Announcement deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
        setDropdownIndex(null); // Close dropdown on delete
    };

    return (
        <div className="announcements-container p-5">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold">Add Announcements</h1>
                {feedbackMessage && <p className="text-green-500">{feedbackMessage}</p>}
            </header>
            <div className="flex justify-end mb-5">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setNewAnnouncement({ title: "", body: "" }); // Reset fields for new announcement
                        setEditingAnnouncementId(null); // Clear editing state
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
                        {announcements.map((announcement) => (
                            <div key={announcement.announcementsID} className="py-3 px-4 mb-2 border relative">
                                <div className="absolute top-0 right-0">
                                    <button
                                        onClick={() => {
                                            // Toggle dropdown visibility
                                            setDropdownIndex(dropdownIndex === announcement.announcementsID ? null : announcement.announcementsID);
                                        }}
                                    >
                                        <ElipsisIcon />
                                    </button>
                                    {/* Dropdown for Edit/Delete */}
                                    {dropdownIndex === announcement.announcementsID && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                            <button
                                                onClick={() => handleEditAnnouncement(announcement)} // Pass announcement for editing
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAnnouncement(announcement.announcementsID)} // Pass announcement ID for deleting
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold">{announcement.announcementsTitle}</h3>
                                <p className="text-gray-700">{announcement.announcementBody}</p>
                                <p className="text-gray-500 text-sm">{new Date(announcement.timeSubmitted).toLocaleString()}</p>
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
                            {editingAnnouncementId ? "Edit Announcement" : "Add New Announcement"}
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
                                {editingAnnouncementId ? "Update Announcement" : "Add Announcement"}
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
