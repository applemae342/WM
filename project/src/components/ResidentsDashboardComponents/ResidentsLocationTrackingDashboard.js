import React from "react";
import MapView from "../MapView";

const ResidentsLocationTrackingDashboard = () => {
    return (
        <div>
            <div>
                <p>Track where is the collector right now.....</p>
            </div>
            <div className="mt-10">
                <MapView />
            </div>
        </div>
    );
};

export default ResidentsLocationTrackingDashboard;
