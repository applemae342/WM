// src/components/MapView.js
import React from "react";

const MapView = () => {
    return (
        <div>
            <div className=" text-center">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15700.697919170927!2d123.89784520347087!3d10.327917786716613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a9993d45b15a29%3A0x5e54d68c879733f9!2sBarrio%20Luz%20National%20High%20School!5e0!3m2!1sen!2sph!4v1726447529083!5m2!1sen!2sph"
                    width="100%" // Adjust to 100% for responsive design
                    height="500" // Adjust height as needed
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Map"
                ></iframe>
            </div>
        </div>
    );
};

export default MapView;
