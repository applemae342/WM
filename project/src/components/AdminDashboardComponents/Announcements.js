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
                setAnnouncements(data.sort((a, b) => new Date(b.timeSubmitted) - new Date(a.timeSubmitted)));
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
                try {
                    const response = await fetch(
                        `http://localhost:8000/API/Announcements/update/${editingAnnouncementId}`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                announcementsTitle: title.trim(),
                                announcementBody: body.trim(),
                            }),
                        }
                    );

                    if (response.ok) {
                        const updatedAnnouncement = await response.json();
                        setAnnouncements((prev) =>
                            prev.map((ann) =>
                                ann.announcementsID === updatedAnnouncement.announcementsID
                                    ? updatedAnnouncement
                                    : ann
                            )
                        );
                        displayFeedbackMessage("Announcement updated successfully!");
                    }
                } catch (error) {
                    console.error("Error updating announcement:", error);
                }
            } else {
                const newAnn = {
                    announcementsTitle: title.trim(),
                    announcementBody: body.trim(),
                    userID: "your-user-id-here",
                };

                try {
                    const response = await fetch("http://localhost:8000/API/Announcements/create", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
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
                setAnnouncements((prev) => prev.filter((ann) => ann.announcementsID !== announcementId));
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
                <h1 className="text-3xl font-bold text-[#000000]">Manage Announcements</h1>
                {feedbackMessage && (
                    <div className="bg-green-100 text-green-800 py-2 px-4 rounded mb-4">
                        {feedbackMessage}
                    </div>
                )}
            </header>
            <div className="flex justify-end mb-5">
                <button
                    onClick={() => {
                        setIsModalOpen(true);
                        setNewAnnouncement({ title: "", body: "" });
                        setEditingAnnouncementId(null);
                    }}
                    className="flex items-center bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-all"
                >
                    <AddIcon className="w-5 h-5" />
                    <span className="ml-2">Add Announcement</span>
                </button>
            </div>
            <div className="bg-white rounded shadow-md p-4">
                {announcements.length === 0 ? (
                    <p className="text-gray-600 text-center">No announcements added yet.</p>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement) => (
                            <div key={announcement.announcementsID} className="relative bg-gray-50 p-4 rounded shadow">
                                <h3 className="font-semibold text-gray-800">{announcement.announcementsTitle}</h3>
                                <p className="text-gray-700">{announcement.announcementBody}</p>
                                <p className="text-gray-500 text-sm">{new Date(announcement.timeSubmitted).toLocaleString()}</p>
                                <div className="absolute top-2 right-2">
                                    <button
                                        onClick={() =>
                                            setDropdownIndex(dropdownIndex === announcement.announcementsID ? null : announcement.announcementsID)
                                        }
                                    >
                                        <ElipsisIcon className="w-5 h-5" />
                                    </button>
                                    {dropdownIndex === announcement.announcementsID && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                                            <button
                                                onClick={() => handleEditAnnouncement(announcement)}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAnnouncement(announcement.announcementsID)}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className="bg-light-green p-6 rounded-xl shadow-lg border-t-4 border-green-600 w-11/12 sm:w-96"
      style={{ backgroundColor: "#f0fdf4" }}
    >
      <h2 className="text-xl font-bold mb-6 text-green-800 text-center">
        {editingAnnouncementId ? "Edit Announcement" : "Add Announcement"}
      </h2>
      <input
        type="text"
        value={newAnnouncement.title}
        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
        placeholder="Enter title"
        className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
      />
      <textarea
        value={newAnnouncement.body}
        onChange={(e) => setNewAnnouncement({ ...newAnnouncement, body: e.target.value })}
        placeholder="Enter announcement body"
        className="w-full border-2 border-green-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-6 resize-none h-32"
      ></textarea>
      <div className="flex justify-end space-x-4">
        <button
          onClick={handleAddOrEditAnnouncement}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          {editingAnnouncementId ? "Update" : "Add"}
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
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
