import Link from "next/link";
import Image from "next/image";

const HomePageContent = () => {
    return (
        <div className="relative bg-[#FBFBFE] text-gray-1000 w-full py-16 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between rounded-3xl shadow-2xl max-w-5xl mx-auto font-sans mt-60">
            {/* Content Section */}
            <div className="text-center md:text-left mb-8 md:mb-0 flex-1">
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight tracking-wide">Innovative Waste Solutions</h2>

                <p className="text-xl text-gray-700 mb-8 max-w-lg mx-auto md:mx-0">
                    "Revolutionize waste management: Track, plan routes, reduce impact for a greener future!"
                </p>

                <div className="flex justify-center md:justify-start">
                    <Link
                        href="/GetStarted"
                        className="bg-[#4BAA6C] text-white py-4 px-10 rounded-full font-semibold text-xl shadow-lg transform transition-transform hover:bg-[#2E8ECA] hover:scale-105 duration-300 ease-in-out"
                    >
                        GET STARTED
                    </Link>
                </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full md:w-1/2 mt-12 md:mt-0 transform transition-transform duration-300 ease-in-out hover:scale-105">
                <Image
                    src="/images/backhround.gif"
                    alt="Garbage Truck"
                    width={560}
                    height={1050}
                    layout="intrinsic"
                    className="rounded-3xl shadow-2xl border-4 border-[#DDDDDD] transition-all ease-in-out transform hover:rotate-3"
                />
            </div>
        </div>
    );
};

export default HomePageContent;
