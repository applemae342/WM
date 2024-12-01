import HomePageContent from "@/components/HomePageContent";
import Navbar from "@/components/Navbar";
import About from "./about";
import Contact from "./contact";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#2E8ECA] to-white">
            {/* Navbar with background color */}
            <Navbar homeTitle="Home" aboutTitle="About" contactTitle="Contact" className="bg-[#4BAA6C] text-white shadow-md" />

            {/* Main Content */}
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                {/* Home Section */}
                <section id="home" className="mb-0">
                    <div className="mt-16" data-aos="fade-up">
                        <HomePageContent />
                    </div>
                </section>

                {/* About Section */}
                <div className="flex justify-center">
                    <section id="about" className="h-full mt-24 rounded-lg bg-white w-full sm:w-[80rem] px-4 sm:px-8" data-aos="fade-right">
                        <About />
                    </section>
                </div>

                {/* Contact Section */}
                <div className="flex justify-center">
                    <section
                        id="contact"
                        className="w-full sm:w-[80rem] mt-24 py-12 px-6 md:px-12 rounded-lg bg-white shadow-lg"
                        data-aos="fade-right"
                    >
                        <Contact />
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-[#1F4F7A] text-white py-6 relative z-20 mt-16">
                <div className="container mx-auto px-4">
                    <Footer />
                </div>
            </footer>
        </div>
    );
}
