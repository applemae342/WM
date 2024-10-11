import Link from "next/link";
import Image from "next/image";

const HomePageContent = () => {
    return (
        <div className="relative bg-[#FBFBFE] text-gray-1000 w-1/2 py-10 mt-60 md:py-4 px-8 md:px-16 flex flex-col items-center rounded-lg shadow-2xl max-w-3xl right-[-5px] font-sans"> {/* Added font-sans for Open Sans */}
            {/* Content Section - Centered */}
            <div className="text-center mb-8">
                <h2 className="text-[28px] mt-10 font-bold mb-4 leading-tight text-gray-900">
                    Innovative Waste Solutions
                </h2>

                <p className="mt-5 text-lg text-gray-700 mb-8">
                    "Revolutionize waste management: Track, plan routes, reduce impact for a greener future!"
                </p>
                <Link
                    href="/GetStarted"
                    className="bg-[#4BAA6C] text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-[#2E8ECA] transition duration-300 ease-in-out"
                >
                    GET STARTED
                </Link>
            </div>

            {/* Image Section - Bigger Square Image with Enhanced Shadow and Adjusted Position */}
            <div className="absolute right-[-645px] top-[47%] transform -translate-y-1/2 overflow-hidden rounded-lg shadow-lg mr-8">
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
