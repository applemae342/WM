import React from "react";
import { useRouter } from "next/router";

const Profile = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.back();
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold text-gray-900">Welcome to User Profile</h1>
                <p className="text-gray-600 mt-2">Here you can view and manage your profile information.</p>
                <button
                    onClick={handleBackClick}
                    className="mt-6 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Back
                </button>
            </div>
        </div>
    );
};

export default Profile;
