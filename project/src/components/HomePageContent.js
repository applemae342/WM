import Link from "next/link";
import Image from "next/image";

const HomePageContent = () => {
    return (
        <div className=" text-white py-16 px-8 md:px-16 flex flex-col md:flex-row items-center rounded-lg shadow-lg">
            {/* Content Section */}
            <div className="max-w-4xl mx-auto text-center md:text-left md:mr-10">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-black">
                    Revolutionize waste management:
                    <br className="hidden md:inline" />
                    Track, plan routes, reduce impact for a greener future!
                </h2>
                <Link
                    href="/GetStarted"
                    className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 hover:text-white focus:outline-none transition duration-300 ease-in-out inline-block"
                >
                    Get Started
                </Link>
            </div>

            {/* Image Section */}
            <div className="mt-10 md:mt-0 md:ml-10 flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
                <Image src="/images/earth.jpg" alt="Earth" width={400} height={400} layout="responsive" className="rounded-lg" />
            </div>
        </div>
    );
};

export default HomePageContent;
