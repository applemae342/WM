import React, { useState, useEffect } from "react";
import { BellIcon, ElipsisIcon } from "@/components/heroIcons/Icons";
import Modal from "@/components/Modal";

const CollectorHomeDashboard = ({ onViewAnnouncements }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [truckUsername, setTruckUsername] = useState(""); // Initialize the truckUsername state
    const [truckData, setTruckData] = useState({}); // Initialize truckData to store truck details
    const [notifications, setNotifications] = useState([ 
        { id: 1, message: "Collection date is Available", time: "2 minutes ago" },
        { id: 2, message: "Your profile was updated.", time: "5 minutes ago" },
        { id: 3, message: "You have 3 new notifications.", time: "10 minutes ago" },
    ]);

    // Fetch truckUsername, truckData from localStorage on component mount
    useEffect(() => {
        // Get truck credentials from localStorage
        const truckId = localStorage.getItem("truckId");
        const plateNumber = localStorage.getItem("plateNumber");
        const truckUsername = localStorage.getItem("truckUsername");
        const description = localStorage.getItem("description");
        const routesID = localStorage.getItem("routesID");
        

        // Check if data exists in localStorage
        if (truckId && plateNumber && truckUsername) {
            setTruckData({
                truckId,
                plateNumber,
                truckUsername,
                description,
                routesID
            });
            setTruckUsername(truckUsername); // Set truckUsername
        }

    }, []); // Empty dependency array to run only once on mount

    // Open and close modal
    const openModal = () => setModalOpen(true);
    const closeModal = () => {
        setSelectedNotification(null);
        setModalOpen(false);
    };

    // Handle notification click
    const handleNotificationClick = (notification) => {
        onViewAnnouncements();
        closeModal();
    };

    // Handle ellipsis click for actions on notifications
    const handleEllipsisClick = (notification) => {
        setSelectedNotification(notification);
    };

    // Handle delete notification
    const handleDelete = () => {
        if (selectedNotification) {
            setNotifications(notifications.filter((n)=> n.id !== selectedNotification.id));
            setSelectedNotification(null);
        }
    };

    return (
        <div className="p-5 font-sans text-[24px] border">
            <div className="flex justify-between items-center mb-5">
                <div className="">
                    <p className="text-[24px] text-green-700">
                        <b>Welcome {truckUsername}</b>
                    </p>
                    <p className="text-gray-600  text-[18px] mt-5">You can now proceed to your work!</p>
                </div>
               <div>
               <button onClick={openModal} className="text-blue-500">
                    <BellIcon />
                </button>
               </div>
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
                        <button
                            onClick={handleDelete}
                            className="text-red-500 hover:underline"
                        >
                            Delete Notification
                        </button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default CollectorHomeDashboard;