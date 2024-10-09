import { useRouter } from "next/router";

const UserProfile = () => {
    const router = useRouter();

    const handleBackClick = () => {
        router.push("/dashboard/AdminDashboard");
    };

    return (
        <div className="p-4">
            <button onClick={handleBackClick} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">
                Back
            </button>
            <h1 className="text-xl font-bold">User Profile</h1>
            <p>Details about the user will be shown here.</p>
        </div>
    );
};

export default UserProfile;
