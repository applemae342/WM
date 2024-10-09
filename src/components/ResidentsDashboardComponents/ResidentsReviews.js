import React, { useState } from "react";
import { BellIcon } from "../heroIcons/Icons";

const StarRating = ({ rating, onChange }) => {
    const handleClick = (value) => {
        onChange(value);
    };

    return (
        <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-8 h-8 cursor-pointer transition-transform transform hover:scale-110 ${
                        rating >= star ? "text-yellow-400" : "text-gray-300"
                    }`}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    onClick={() => handleClick(star)}
                >
                    <path d="M12 .587l3.668 7.431 8.213 1.189-5.94 5.773 1.4 8.161L12 18.896l-7.341 3.878 1.4-8.161-5.94-5.773 8.213-1.189L12 .587z" />
                </svg>
            ))}
        </div>
    );
};

const ResidentsReviews = () => {
    const [username, setUsername] = useState("");
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [notificationCount, setNotificationCount] = useState(3);
    const [notifications, setNotifications] = useState(["Your review was received.", "Admin has seen your review.", "Admin will reply soon."]);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({ username, reviewText, rating });
        setSubmitted(true);
        setNotificationCount(notificationCount + 1);
        setUsername("");
        setReviewText("");
        setRating(1);
    };

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-end p-2">
                <button onClick={handleModalOpen} className="relative p-2" aria-label="View Notifications">
                    <BellIcon className="w-6 h-6 text-gray-600" />
                    {notificationCount > 0 && (
                        <span className="absolute top-0 right-0 w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                            {notificationCount}
                        </span>
                    )}
                </button>
            </div>
            <div className="text-center mb-10 text-2xl">Collection Review</div>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg relative">
                {submitted ? (
                    <div className="text-center">
                        <p className="text-green-600 mb-4">Thank you for your feedback! The admin will review it and notify you of any updates.</p>
                        <button
                            onClick={() => setSubmitted(false)}
                            className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                        >
                            Back
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-0 outline-none"
                            />
                        </div>
                        <div>
                            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700">
                                Review:
                            </label>
                            <textarea
                                id="reviewText"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                required
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-0 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rating:</label>
                            <StarRating rating={rating} onChange={setRating} />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                            Submit Review
                        </button>
                    </form>
                )}

                {/* Modal for notifications */}
                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="fixed inset-0 bg-black opacity-50" onClick={handleModalClose}></div>
                        <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
                            <h2 className="text-xl font-bold mb-4">Notifications</h2>
                            {notifications.length > 0 ? (
                                <ul className="space-y-2">
                                    {notifications.map((notification, index) => (
                                        <li key={index} className="text-gray-700">
                                            {notification}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-700">No new notifications yet. Check back later!</p>
                            )}
                            <button onClick={handleModalClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResidentsReviews;
