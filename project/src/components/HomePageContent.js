import Link from "next/link";
import Image from "next/image";

const HomePageContent = () => {
    return (
        <div className="relative bg-[#FBFBFE] text-gray-1000 w-full md:w-1/2 py-10 mt-60 md:py-4 px-8 md:px-16 flex flex-col md:flex-row items-center rounded-lg shadow-2xl max-w-3xl font-sans">
            {/* Content Section - Centered */}
            <div className="text-center mb-2 md:text-left md:mb-7 flex-1">
                <h2 className="text-[28px] px-16 mt-5 font-bold mb-4 leading-tight text-gray-900">
                    Innovative Waste Solutions
                </h2>

                <p className="mt-5 text-lg text-gray-700 mb-8">
                    "Revolutionize waste management: Track, plan routes, reduce impact for a greener future!"
                </p>

                {/* Wrapper for centering the button */}
                <div className="flex justify-center">
                    <Link
                        href="/GetStarted"
                        className="bg-[#4BAA6C] text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-[#2E8ECA] transition duration-300 ease-in-out"
                    >
                        GET STARTED
                    </Link>
                </div>
            </div>

            {/* Image Section */}
            <div className="absolute right-[-105%] md:right-[-100%] top-[50%] transform -translate-y-1/2 overflow-hidden rounded-lg shadow-lg max-w-full md:max-w-[90%]">
                <Image
                    src="/images/backhround.gif"
                    alt="Garbage Truck"
                    width={560}
                    height={1050}
                    layout="intrinsic"
                    className="shadow-2xl border border-gray-300 rounded-lg transition-transform duration-300 transform hover:scale-105"
                />
            </div>
        </div>
    );
};

export default HomePageContent;
