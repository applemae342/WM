import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

const About = () => {
    return (
        <div className="relative">
            {/* Circular Gradient Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute bg-gradient-to-r from-blue-500 to-green-400 opacity-60 rounded-full"
                    style={{
                        width: '800px',
                        height: '800px',
                        top: '-100px',
                        left: '-200px',
                        zIndex: '-1',
                    }}
                ></div>
                <div
                    className="absolute bg-gradient-to-r from-blue-600 to-purple-400 opacity-40 rounded-full"
                    style={{
                        width: '600px',
                        height: '600px',
                        top: '200px',
                        right: '-100px',
                        zIndex: '-1',
                    }}
                ></div>
            </div>

            {/* About Text Section */}
            <div className="text-center mb-6 max-w-md mx-auto z-10 relative">
                <h2 className="text-3xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                    About Us
                </h2>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Georgia, serif', fontSize: '20px' }}>
                    Welcome to the Waste Management Tracking System! We are dedicated to revolutionizing waste management through innovative web-based solutions designed to optimize waste collection processes, enhance efficiency, and minimize environmental impact.
                </p>
            </div>

            {/* Image Section with Vision, Mission, and Additional Section */}
            <div className="relative z-10">
                <img
                    src="/images/bg.png" // Path to the uploaded image
                    alt="Waste Management Process"
                    className="w-full h-auto object-cover"
                />

                {/* Overlay for Vision, Mission, and Additional Section */}
                <div className="absolute top-0 left-0 right-0 flex flex-col justify-start items-center h-full px-10 z-10">
                    {/* First row with Vision and Mission */}
                    <div className="flex justify-around items-start w-full mt-10">
                        {/* Vision Box */}
                        <div className="bg-white bg-opacity-70 p-6 rounded-lg max-w-md shadow-lg">
                            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Vision</h2>
                            <p className="text-base" style={{ fontFamily: 'Georgia, serif' }}>
                                We envision a future where waste management is efficient, transparent, and environmentally conscious. By leveraging technology and engaging stakeholders, we aim to reduce missed pickups, enhance communication, and optimize waste management practices for the benefit of communities and the environment.
                            </p>
                        </div>

                        {/* Mission Box */}
                        <div className="bg-white bg-opacity-70 p-6 rounded-lg max-w-md shadow-lg">
                            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Mission</h2>
                            <p className="text-base" style={{ fontFamily: 'Georgia, serif' }}>
                                Our mission is to optimize waste collection processes, ensure timely pickups, and minimize environmental impact. We strive to streamline operations, promote resource efficiency, and foster environmental sustainability through transparent communication and user-friendly interfaces.
                            </p>
                        </div>
                    </div>

                    {/* Second row with Our Goals */}
                    <div className="w-full flex justify-center mt-48">
                        <div className="bg-white bg-opacity-70 p-6 rounded-lg max-w-2xl shadow-2xl">
                            <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Georgia, serif' }}>Our Goals</h2>
                            <p className="text-base" style={{ fontFamily: 'Georgia, serif' }}>
                                Our goal is to keep improving waste management by using the latest technologies to make waste collection more efficient and eco-friendly. We aim to:
                            </p>
                            <ul className="list-disc list-inside" style={{ fontFamily: 'Georgia, serif' }}>
                                <li>Reduce the environmental impact of waste collection.</li>
                                <li>Make sure no pickups are missed with better tracking systems.</li>
                                <li>Increase recycling through better sorting methods and awareness.</li>
                                <li>Work with local governments and communities for more sustainable waste disposal.</li>
                                <li>Provide clear, easy-to-understand reports and tools for users.</li>
                            </ul>
                            <p className="text-base mt-4" style={{ fontFamily: 'Georgia, serif' }}>
                                By achieving these goals, we hope to help create a cleaner and more sustainable future.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
