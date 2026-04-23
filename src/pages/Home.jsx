import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Gallery from "../components/Gallery";
import Services from "../pages/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { WHATSAPP_NUMBER } from "../data/servicesData";

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.scrollTo;
    if (section) {
      window.setTimeout(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <Hero />
      <Services embedded />
      <Gallery />

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
              Why Choose Us
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-gray-950 md:text-5xl">
              Clear categories, careful fitting, and easy booking
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Service-wise design browsing",
              "Search and filter by category",
              "WhatsApp enquiry for every design",
              "Admin upload support for new photos",
            ].map((item) => (
              <div key={item} className="border border-gray-200 p-5">
                <p className="font-semibold text-gray-950">{item}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  Built so customers can find the right design quickly and contact you without confusion.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 bg-green-500 px-5 py-3 text-sm font-semibold text-white shadow-lg"
      >
        WhatsApp
      </a>
    </>
  );
};

export default Home;
