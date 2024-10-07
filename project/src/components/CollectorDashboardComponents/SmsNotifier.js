import React, { useState } from "react";

const CollectorScheduleDashboard = () => {
    const [modalIndex, setModalIndex] = useState(null);

    // Function to open the modal for a specific button
    const openModal = (index) => {
        setModalIndex(index);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIndex(null);
    };

    // Function to handle proceeding with the action
    const handleProceed = () => {
        // Handle the action for proceeding, e.g., send an SMS or perform any operation
        console.log(`Proceeding with action for Button ${modalIndex + 1}`);
        closeModal(); // Close modal after action
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="text-center mb-6">
                <p className="text-xl font-semibold text-gray-800">Select Route to Send SMS</p>
            </div>
            <div className="flex flex-wrap justify-center space-x-4 space-y-4">
                {/* Buttons */}
                {[...Array(10)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => openModal(index)}
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                    >
                        Button {index + 1}
                    </button>
                ))}
            </div>

            {/* Modal for each button */}
            {modalIndex !== null && (
                <div
                    className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
                    role="dialog"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 id="modal-title" className="text-lg font-semibold mb-4">
                            APPLE RA DAW BAHALA
                        </h2>
                        <p id="modal-description" className="mb-4">
                            Do you want to proceed with the action for Button {modalIndex + 1}?
                        </p>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={closeModal}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleProceed}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
                            >
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollectorScheduleDashboard;
