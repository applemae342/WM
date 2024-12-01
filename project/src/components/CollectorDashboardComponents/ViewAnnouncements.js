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
                // Sort announcements from latest to oldest
                setAnnouncements(data.sort((a, b) => new Date(b.timeSubmitted) - new Date(a.timeSubmitted)));
            } catch (error) {
                console.error("Error fetching announcements:", error);
                setError("Failed to load announcements.");
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Render announcements or loading/error state
    const renderContent = () => {
        if (loading) {
            return (
                <p className="text-center text-gray-500">
                    Loading announcements...
                </p>
            );
        }

        if (error) {
            return (
                <p className="text-center text-red-500">
                    {error}
                </p>
            );
        }

        return (
            <div className="flex flex-col gap-6">
                {announcements.length === 0 ? (
                    <p className="text-center text-gray-700">
                        No announcements available at the moment.
                    </p>
                ) : (
                    announcements.map((announcement) => (
                        <div 
                            key={announcement.announcementsID} 
                            className="bg-white border rounded-lg shadow-md p-5 flex flex-col"
                        >
                            <h3 className="text-xl font-bold  mb-2 ">
                                {announcement.announcementsTitle}
                            </h3>
                            <p className="text-gray-700 mb-3 ">
                                {announcement.announcementBody}
                            </p>
                            <p className="text-sm text-gray-500 ">
                                {new Date(announcement.timeSubmitted).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
        );
    };

    return (
        <div className="p-2 min-h-screen">
            <div className="max-w-4xl mx-auto p-6">
                <header className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Announcements</h1>
                    <p className="text-gray-600">
                        Stay updated with the latest announcements.
                    </p>
                </header>
                {renderContent()}
            </div>
        </div>
    );
};

export default Announcements;
