import HomePageContent from "@/components/HomePageContent";
import Navbar from "@/components/Navbar";
import About from "./about";
import Contact from "./contact";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/bg1.jpg"
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    loading="eager"
                    className="absolute inset-0 z-0"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white opacity-50 z-10" />
            </div>

            {/* Navbar */}
            <Navbar homeTitle="Home" aboutTitle="About" contactTitle="Contact" />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12 relative z-20">
                {/* Home Section */}
                <section id="home" className="mb-12">
                    <div className="mt-16" data-aos="fade-up">
                        <HomePageContent />
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="mb-12 py-12 px-8 rounded-lg" data-aos="fade-left">
                    <About />
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-12 rounded-lg" data-aos="fade-right">
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-4 relative z-20">
                <div className="container mx-auto px-4">
                    <Footer />
                </div>
            </footer>
        </div>
    );
}
