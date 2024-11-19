import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

const About = () => {
    return (
        <div className="">
            {/* Circular Gradient Background */}
            <div className="absolute inset-0 overflow-hidden md: h-[60rem]">
                <div
                    className="absolute bg-gradient-to-r from-blue-500 to-green-400 opacity-60 rounded-full"
                    style={{
                        width: "800px",
                        height: "800px",
                        top: "-100px",
                        left: "-200px",
                        zIndex: "-1",
                    }}
                ></div>
                <div
                    className="absolute bg-gradient-to-r from-blue-600 to-purple-400 opacity-40 rounded-full border border-red-500"
                    style={{
                        width: "600px",
                        height: "600px",
                        top: "140px",
                        right: "-100px",
                        zIndex: "-1",
                    }}
                ></div>
            </div>

            {/* About Text Section */}
            <div className="text-center mb-12 max-w-3xl mx-auto mt-10 font-sans px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-6">About Us</h2>
                <p className="text-lg text-gray-700 leading-relaxed sm:text-xl">
                    Welcome to the Waste Management Tracking System! We are dedicated to revolutionizing waste management through
                    innovative web-based solutions designed to optimize waste collection processes, enhance efficiency, and minimize
                    environmental impact.
                </p>
            </div>

            {/* Image Section with Vision and Mission */}
            <div className="relative z-10 flex justify-center px-4 sm:px-6">
                <img
                    src="/images/bg.png" // Path to the uploaded image
                    alt="Waste Management Process"
                    className="w-full h-[20rem] sm:h-[30rem] object-cover rounded-lg"
                />

                {/* Overlay for Vision and Mission */}
                <div className="absolute top-0 left-0 right-0 flex flex-col justify-start items-center h-full px-6 sm:px-10 z-10">
                    {/* First row with Vision and Mission */}
                    <div className="flex flex-col sm:flex-row justify-between items-center w-full mt-12 md:mt-16 gap-6 sm:gap-12">
                        {/* Vision Box */}
                        <div className="bg-white bg-opacity-80 p-6 rounded-lg max-w-xs sm:max-w-md shadow-xl font-sans">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Vision</h2>
                            <p className="text-base text-gray-700">
                                We envision a future where waste management is efficient, transparent, and environmentally conscious.
                                By leveraging technology and engaging stakeholders, we aim to reduce missed pickups, enhance communication,
                                and optimize waste management practices for the benefit of communities and the environment.
                            </p>
                        </div>

                        {/* Mission Box */}
                        <div className="bg-white bg-opacity-80 p-6 rounded-lg max-w-xs sm:max-w-md shadow-xl font-sans">
                            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mission</h2>
                            <p className="text-base text-gray-700">
                                Our mission is to optimize waste collection processes, ensure timely pickups, and minimize environmental
                                impact. We strive to streamline operations, promote resource efficiency, and foster environmental
                                sustainability through transparent communication and user-friendly interfaces.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
