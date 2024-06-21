import HomePageContent from "@/components/HomePageContent";
import Navbar from "@/components/Navbar";
import About from "./about";
import Contact from "./contact";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen relative">
      {/* Navbar */}
      <Navbar homeTitle="Home" aboutTitle="About" contactTitle="Contact" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Home Section */}
        <section id="home" className="mb-12">
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md mt-16">
            <HomePageContent />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white mb-12 py-12 px-8 rounded-lg shadow-md">
          <About />
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-white py-12 px-8 rounded-lg shadow-md">
          <Contact />
        </section>
      </main>

      {/* Background Image */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src="/images/bg1.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          loading="eager" // Load the image immediately
          className="opacity-100"
        />
      </div> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 relative z-10">
        <div className="container mx-auto px-4">
          <Footer />
        </div>
      </footer>
    </div>
  );
}
