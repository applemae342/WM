import { useState } from "react";

const OtherOptions = () => {
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Message submitted:", message);
    };

    return (
        <div className="relative overflow-hidden">
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg z-10 relative">
                <div className="text-center mb-8 font-sans"> {/* Added font-sans class */}
                    <h2 className="text-3xl font-semibold text-gray-800">Other Options</h2>
                    <p className="text-md text-gray-600 leading-relaxed mt-2">
                        Need assistance or want to get in touch with us? Here's how:
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 font-sans">
                            Questions or other concerns:
                        </label>
                        <textarea
                            id="message"
                            placeholder="Write it here..."
                            value={message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 font-sans"
                        ></textarea>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition font-sans"
                        >
                            Submit
                        </button>
                    </div>

                    <div className="text-center mt-20 mb-16 font-sans">
                        <p className="text-lg font-semibold">Follow us on:</p>
                        <div className="flex justify-center items-center mt-4 space-x-8">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <img src="/images/facebook.png" alt="Facebook" className="w-10 h-10 transition-transform transform hover:scale-110" />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <img src="/images/instag.jpg" alt="Instagram" className="w-10 h-10 transition-transform transform hover:scale-110" />
                            </a>
                            <a href="mailto:your.email@example.com">
                                <img src="/images/email.png" alt="Email" className="w-10 h-10 transition-transform transform hover:scale-110" />
                            </a>
                        </div>
                    </div>
                </form>
            </div>

            {/* Background Circle Design - Positioned like the image you provided */}
            <div className="absolute inset-0 z-0">
                <svg
                    className="absolute top-[-1px] left-[-70px] h-72 w-72 text-blue-200 opacity-75"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="100" cy="100" r="100" fill="#2E8ECA" />
                </svg>

                <svg
                    className="absolute top-[30%] left-[20%] h-48 w-48 text-blue-300 opacity-50"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="100" cy="100" r="100" fill="#4BAA6C" />
                </svg>

                <svg
                    className="absolute bottom-[10%] right-[10%] h-56 w-56 text-blue-400 opacity-50"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="100" cy="100" r="100" fill="#4BAA6C" />
                </svg>

                <svg
                    className="absolute bottom-[-1px] right-[-50px] h-64 w-64 text-blue-200 opacity-50"
                    viewBox="0 0 200 200"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="100" cy="100" r="100" fill="#2E8ECA" />
                </svg>
            </div>
        </div>
    );
};

export default OtherOptions;
