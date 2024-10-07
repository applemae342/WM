import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

const About = () => {
    return (
        <div className="">
            <div className="">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-5">About Us</h2>
                    <p className="text-lg text-gray-700 leading-relaxed mb-12">
                        Welcome to the Waste Management Tracking System. We're committed to revolutionizing waste management through innovative
                        web-based solutions.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="max-w-lg mx-auto border bg-white rounded-lg">
                        <Card
                            title="Vision"
                            content="We envision a future where waste management is efficient, transparent, and environmentally conscious. By leveraging technology and engaging stakeholders, we aim to reduce missed pickups, enhance communication, and optimize waste management practices for the benefit of communities and the environment."
                        />
                    </div>
                    <div className="max-w-lg mx-auto border bg-white rounded-lg">
                        <Card
                            title="Mission"
                            content="Our mission is to optimize waste collection processes, ensure timely pickups, and minimize environmental impact. We strive to streamline operations, promote resource efficiency, and foster environmental sustainability through transparent communication and user-friendly interfaces."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
