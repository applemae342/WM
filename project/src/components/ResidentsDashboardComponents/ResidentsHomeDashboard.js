import React, { useState } from "react";
import { BellIcon, ElipsisIcon } from "../heroIcons/Icons";
import Modal from "../Modal";

const ResidentsHomeDashboard = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const notifications = [
        { message: "Nenia murag bata", time: "2 minutes ago" },
        { message: "Kapoy nag code.", time: "5 minutes ago" },
        { message: "Gutom.", time: "10 minutes ago" },
    ];

    // Example notification count
    const notificationCount = notifications.length;

    return (
        <div>
            <div className="flex justify-between items-center p-4">
                <p>Welcome Jhonryl Martinez</p>
                <div className="relative">
                    <button onClick={openModal} className="text-blue-500 p-2" aria-label="View Notifications">
                        <BellIcon className="w-6 h-6" />
                        {notificationCount > 0 && (
                            <span className="absolute top-0 right-0 block w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full flex items-center justify-center">
                                {notificationCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Modal for notifications */}
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Notifications">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div key={index} className="flex flex-col p-4 border-b">
                            <div className="flex items-center justify-between">
                                <p className="text-gray-700">{notification.message}</p>
                                <button className="text-gray-500 hover:text-gray-700">
                                    <ElipsisIcon />
                                </button>
                            </div>
                            <p className="text-gray-500 text-sm mt-2">{notification.time}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-700 p-4">No new notifications yet.</p>
                )}
            </Modal>

           
        </div>
    );
};

export default ResidentsHomeDashboard;
