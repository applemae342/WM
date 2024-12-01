import React from "react";

const ResidentsScheduleDashboard = () => {
    return (
        <div>
            <div>
                <div>
                    <p className="text-center">View Collection Routes</p>
                </div>
                <div className="mt-10">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200 sticky top-0">
                            <tr>
                                <th className="p-2 text-left">Username</th>
                                <th className="p-2 text-left">Contact Number</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ResidentsScheduleDashboard;
