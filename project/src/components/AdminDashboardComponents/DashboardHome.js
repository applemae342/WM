import GraphView from "../GraphView";

const DashboardHome = () => {
    return (
        <div className="max-w-6xl mx-auto p-4 font-sans"> {/* Apply Open Sans font to the entire component */}
            <div className="bg-white p-6 rounded-lg shadow-lg mb-6"> {/* Added background, padding, and shadow */}
                <h1 className="text-3xl font-bold text-[#2E8ECA] text-center"> {/* Centered text for a more welcoming look */}
                    Welcome Admin!
                </h1>
                <p className="text-gray-600 text-center mt-2"> {/* Optional subtext for warmth */}
                    We're glad to have you back. Let's manage your dashboard!
                </p>
            </div>
            <div className="p-4 flex justify-between items-center bg-white rounded-lg">
                <div className="flex-1 ml-4">
                    <GraphView />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
