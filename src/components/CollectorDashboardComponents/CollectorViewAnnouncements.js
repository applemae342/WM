// src/components/ViewAnnouncements.js
import React from "react";

const ViewAnnouncements = () => {
    // Dummy announcements data
    const announcements = [
        {
            title: "Announcement 1",
            body: "This is the body of the first announcement.",
            time: "2024-10-01 12:00 PM",
        },
        {
            title: "Announcement 2",
            body: "This is the body of the second announcement.",
            time: "2024-10-02 01:30 PM",
        },
        {
            title: "Announcement 3",
            body: "This is the body of the third announcement.",
            time: "2024-10-03 09:15 AM",
        },
        {
            title: "Announcement 4",
            body: "This is the body of the fourth announcement.",
            time: "2024-10-04 03:45 PM",
        },
        {
            title: "Announcement 5",
            body: "This is the body of the fifth announcement.",
            time: "2024-10-05 11:00 AM",
        },
    ];

    return (
        <div className="min-h-screen p-5">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <header className="p-4 text-center">
                    <h1 className="text-2xl font-bold">View Announcements</h1>
                </header>
                <div className="p-6">
                    {announcements.length === 0 ? (
                        <p className="text-gray-600 text-center">No announcements available.</p>
                    ) : (
                        <div className="space-y-4">
                            {announcements.map((announcement, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                    <h3 className="font-semibold text-lg">{announcement.title}</h3>
                                    <p className="text-gray-700">{announcement.body}</p>
                                    <p className="text-gray-500 text-sm">{announcement.time}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewAnnouncements;
