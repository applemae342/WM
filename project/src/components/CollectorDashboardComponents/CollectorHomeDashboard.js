import React, { useState } from "react";
import { BellIcon, ElipsisIcon } from "@/components/heroIcons/Icons";
import Modal from "@/components/Modal";
import GraphView from "@/components/GraphView";
import LeftView from "@/components/LeftView";

const CollectorHomeDashboard = ({ onViewAnnouncements }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Collection date is Available", time: "2 minutes ago" },
        { id: 2, message: "Your profile was updated.", time: "5 minutes ago" },
        { id: 3, message: "You have 3 new notifications.", time: "10 minutes ago" },
    ]);

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
            setNotifications(notifications.filter((n) => n.id !== selectedNotification.id));
            setSelectedNotification(null);
        }
    };

    return (
        <div className="p-5 font-sans text-[24px]">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <p className="text-[24px] text-[#2E8ECA] ">
                         <b>Welcome Jhonryl Martinez</b>
                    </p>
                    <p className="text-gray-600 mt-1 text-[18px]">You can now proceed to your work!</p>
                </div>
                <button onClick={openModal} className="text-blue-500">
                    <BellIcon />
                </button>
            </div>

            <div className="flex gap-4 mt-5">
                <div className="flex-1 border p-4">
                    <LeftView />
                </div>
                <div className="flex-1 border p-4">
                    <GraphView />
                </div>
            </div>

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
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white p-4 rounded shadow-lg">
                            <p className="text-gray-700 mb-2">Actions for this notification:</p>
                            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 block mb-2">
                                Delete
                            </button>
                            <button onClick={() => setSelectedNotification(null)} className="text-gray-500 hover:text-gray-700">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CollectorHomeDashboard;
    