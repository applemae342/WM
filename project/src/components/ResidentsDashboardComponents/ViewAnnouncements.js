import React, { useEffect, useState } from "react";

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true); // For loading state
    const [error, setError] = useState(null); // For error handling

    // Fetch announcements on component mount
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await fetch("http://localhost:8000/API/Announcements/getAll");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setAnnouncements(data.sort((a, b) => new Date(b.timeSubmitted) - new Date(a.timeSubmitted))); // Sort from latest to oldest
            } catch (error) {
                console.error("Error fetching announcements:", error);
                setError("Failed to load announcements.");
            } finally {
                setLoading(false); // Stop loading state
            }
        };

        fetchAnnouncements();
    }, []);

    // Render announcements or loading/error state
    const renderContent = () => {
        if (loading) {
            return <p>Loading announcements...</p>;
        }

        if (error) {
            return <p className="text-red-500">{error}</p>;
        }

        return (
            <div className="announcements-list">
                {announcements.length === 0 ? (
                    <p>No announcements added yet.</p>
                ) : (
                    <div className="list-disc pl-5">
                        {announcements.map((announcement) => (
                            <div key={announcement.announcementsID} className="py-3 px-4 mb-2 border-b border-gray-300">
                                <h3 className="font-semibold text-[#2E8ECA]">{announcement.announcementsTitle}</h3>
                                <p className="text-gray-700">{announcement.announcementBody}</p>
                                <p className="text-gray-500 text-sm">{new Date(announcement.timeSubmitted).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-5 bg-white rounded-lg shadow-md">
            <header className="text-center mb-4">
                <h1 className="text-2xl font-bold text-[#4BAA6C]">View Announcements</h1>
            </header>
            {renderContent()}
        </div>
    );
};

export default Announcements;
