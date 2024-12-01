import React, { useState, useEffect } from "react";
import { BellIcon, ElipsisIcon } from "@/components/heroIcons/Icons";
import Modal from "@/components/Modal";
import GraphView from "@/components/GraphView";
import LeftView from "@/components/LeftView";

const ResidentsHomeDashboard = ({ onViewAnnouncements }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [loggedUsername, setLoggedUsername] = useState("");
    const [truckData, setTruckData] = useState(null); // State for truck details
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Collection date is Available", time: "2 minutes ago" },
        { id: 2, message: "Your profile was updated.", time: "5 minutes ago" },
        { id: 3, message: "You have 3 new notifications.", time: "10 minutes ago" },
    ]);

    // Fetch loggedUsername and truckData from localStorage on component mount
    useEffect(() => {
        const userID = localStorage.getItem("userID");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username"); // Consistent key usage from SignIn

        if (userID && role && username) {
            setTruckData({
                userID,
                role,
                username,
            });
            setLoggedUsername(username); // Set consistent logged username
        }
    }, []);

    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setSelectedNotification(null);
        setModalOpen(false);
    };

    const handleNotificationClick = (notification) => {
        onViewAnnouncements();
        closeModal();
    };

    const handleEllipsisClick = (notification) => {
        setSelectedNotification(notification);
    };

    const handleDelete = () => {
        if (selectedNotification) {
            setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== selectedNotification.id));
            setSelectedNotification(null);
        }
    };

    return (
        <div className="p-5 font-sans text-[24px]">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <p className="text-[24px] text-green-700">
                        <b>Welcome {loggedUsername}</b>
                    </p>
                    <p className="text-gray-600 mt-1 text-[18px]">You can now proceed to your work!</p>
                </div>
                <button onClick={openModal} className="text-blue-500">
                    <BellIcon />
                </button>
            </div>

          


            {/* Notification Modal */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Notifications">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="flex flex-col p-4 border-b cursor-pointer"
                        onClick={() => handleNotificationClick(notification)}
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-gray-700">{notification.message}</p>
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEllipsisClick(notification);
                                }}
                            >
                                <ElipsisIcon />
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-2">{notification.time}</p>
                    </div>
                ))}
                {selectedNotification && (
                    <div className="mt-4">
                        <button onClick={handleDelete} className="text-red-500 hover:underline">
                            Delete Notification
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ResidentsHomeDashboard;
