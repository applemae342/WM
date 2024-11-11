import React, { useEffect, useState } from "react";
import { AddIcon, ElipsisIcon } from "../heroIcons/Icons";

const Announcements = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: "",
        body: "",
    });
    const [announcements, setAnnouncements] = useState([]);
    const [editingAnnouncementId, setEditingAnnouncementId] = useState(null);
    const [dropdownIndex, setDropdownIndex] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");

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
        }, 3000);
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
                        setAnnouncements([addedAnnouncement, ...announcements]);
                        displayFeedbackMessage("Announcement added successfully!");
                    }
                } catch (error) {
                    console.error("Error adding announcement:", error);
                }
            }

            setNewAnnouncement({ title: "", body: "" });
            setIsModalOpen(false);
            setEditingAnnouncementId(null);
        }
    };

    const handleEditAnnouncement = (announcement) => {
        setNewAnnouncement({
            title: announcement.announcementsTitle,
            body: announcement.announcementBody,
        });
        setEditingAnnouncementId(announcement.announcementsID);
        setIsModalOpen(true);
        setDropdownIndex(null);
    };

    const handleDeleteAnnouncement = async (announcementId) => {
        try {
            const response = await fetch(`http://localhost:8000/API/Announcements/delete/${announcementId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAnnouncements((prevAnnouncements) => prevAnnouncements.filter((ann) => ann.announcementsID !== announcementId));
                displayFeedbackMessage("Announcement deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting announcement:", error);
        }
        setDropdownIndex(null);
    };

    return (
        <div className="announcements-container p-5 max-w-4xl mx-auto">
            <header className="text-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Manage Announcements</h1>
                {feedbackMessage && <p className="text-green-500">{feedbackMessage}</p>}
            </header>
            <div className="flex justify-end mb-5">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setNewAnnouncement({ title: "", body: "" });
                        setEditingAnnouncementId(null);
                    }}
                    aria-label="Add New Announcement"
                    className="flex items-center text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-200"
                >
                    <AddIcon className="w-5 h-5" />
                    <span className="ml-2">Add Announcement</span>
                </button>
            </div>

            <div className="announcements-list bg-white rounded shadow-md p-4">
                {announcements.length === 0 ? (
                    <p className="text-gray-600 text-center">No announcements added yet.</p>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement) => (
                            <div key={announcement.announcementsID} className="py-3 px-4 border-b relative">
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() => {
                                            setDropdownIndex(dropdownIndex === announcement.announcementsID ? null : announcement.announcementsID);
                                        }}
                                        aria-label="More options"
                                    >
                                        <ElipsisIcon className="w-5 h-5" />
                                    </button>
                                    {dropdownIndex === announcement.announcementsID && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                            <button
                                                onClick={() => handleEditAnnouncement(announcement)}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAnnouncement(announcement.announcementsID)}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <h3 className="font-semibold text-gray-800">{announcement.announcementsTitle}</h3>
                                <p className="text-gray-700">{announcement.announcementBody}</p>
                                <p className="text-gray-500 text-sm">{new Date(announcement.timeSubmitted).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-5 w-11/12 sm:w-80 md:w-96 lg:w-2/3 xl:w-1/2 mx-auto max-w-lg">
                        <h2 className="text-lg font-semibold mb-4">{editingAnnouncementId ? "Edit Announcement" : "Add New Announcement"}</h2>
                        <input
                            type="text"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                            placeholder="Enter title"
                            className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <textarea
                            value={newAnnouncement.body}
                            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
                            placeholder="Enter announcement body"
                            className="border border-gray-300 p-2 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex justify-end">
                            <button onClick={handleAddOrEditAnnouncement} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                                {editingAnnouncementId ? "Update Announcement" : "Add Announcement"}
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
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
