import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SHOP_NAME, WHATSAPP_NUMBER } from "../data/servicesData";
import heroBanner from "../assets/hero-tailor-banner.png";

const Hero = () => {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden pt-24 text-white"
      style={{
        backgroundImage:
          `linear-gradient(90deg, rgba(17,24,39,0.86), rgba(131,24,67,0.36)), url(${heroBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto grid min-h-[calc(92vh-6rem)] max-w-7xl items-center px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-[#FBBF24]"
          >
            Custom tailoring in Telangana
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-5 max-w-3xl font-heading text-5xl font-bold leading-tight md:text-7xl"
          >
            {SHOP_NAME}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-gray-100"
          >
            Blouse stitching, embroidery, bridal finishing, dress stitching, and alterations with neat fitting and elegant design choices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link to="/embroidery-designs" className="bg-white px-6 py-3 font-semibold text-gray-950 transition hover:bg-[#FBBF24]">
              View Embroidery Designs
            </Link>
            <Link to="/services" className="bg-[#FBBF24] px-6 py-3 font-semibold text-gray-950 transition hover:bg-white">
              Services
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="border border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-gray-950"
            >
              Book on WhatsApp
            </a>
          </motion.div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:mt-0">
          {[
            ["01", "Blouse Stitching"],
            ["02", "Embroidery Work"],
            ["03", "Lehengas"],
            ["04", "Alterations"],
          ].map(([number, label]) => (
            <div key={label} className="bg-white/12 p-5 ring-1 ring-white/20 backdrop-blur">
              <p className="font-heading text-3xl font-bold text-[#FBBF24]">{number}</p>
              <p className="mt-3 font-semibold">{label}</p>
              <p className="mt-1 text-sm text-gray-200">Made to fit your fabric, occasion, and style.</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
