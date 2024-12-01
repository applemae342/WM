import React from "react";
import ReactDOM from "react-dom";
import { XmarkIcon } from "./heroIcons/Icons";

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[30rem] h-[40rem] max-w-sm mx-4 p-6 relative">
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={onClose}>
                    <XmarkIcon />
                </button>
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <div className="text-gray-700">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
