import HomePageContent from "@/components/HomePageContent";
import Navbar from "@/components/Navbar";
import About from "./about";
import Contact from "./contact";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-r from-[#2E8ECA] to-white">
            {/* Navbar with background color */}
            <Navbar homeTitle="Home" aboutTitle="About" contactTitle="Contact" className="bg-[#4BAA6C] text-white" />

            {/* Main Content */}
            <main className="container mx-auto px-4 relative z-20">
                {/* Home Section */}
                <section id="home" className="mb-0"> {/* No margin-bottom */}
                    <div className="mt-16" data-aos="fade-up">
                        <HomePageContent />
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="mt-40 py-12 px-8 rounded-lg bg-white shadow-lg" data-aos="fade-left"> {/* Increased margin-top */}
                    <About />
                </section>

                {/* Contact Section */}
                <section id="contact" className="mt-36 py-12 rounded-lg bg-white shadow-lg" data-aos="fade-right"> {/* Ensure no overlap */}
                    <Contact />
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-[#1F4F7A] text-white py-4 relative z-20 mt-12"> {/* Changed footer background to a solid color */}
                <div className="container mx-auto px-4">
                    <Footer />
                </div>
            </footer>
        </div>
    );
}
