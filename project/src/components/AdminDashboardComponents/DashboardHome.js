import GraphView from "../GraphView";

const DashboardHome = () => {
    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="text-lg font-semibold">
                <p>Welcome Admin</p>
            </div>
            <div className=" p-4 flex justify-between items-center bg-white rounded-lg">
                <div className="flex-1 ml-4">
                    <GraphView />
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
