import { Link } from "react-router-dom";
import { featuredDesigns } from "../data/servicesData";

const Gallery = () => {
  return (
    <section id="gallery" className="bg-[#FDF2F8] py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
              Featured Designs
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-gray-950 md:text-5xl">
              Popular embroidery choices
            </h2>
          </div>
          <Link to="/embroidery-designs" className="bg-[#9D174D] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#831843]">
            Browse Embroidery
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDesigns.map((item) => (
            <Link key={item.id} to={item.service === "embroidery" ? "/embroidery-designs" : `/services/${item.service}`} className="group relative h-80 overflow-hidden bg-gray-200">
              <img src={item.images[0]} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-5 text-white">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#FBBF24]">{item.category}</p>
                <h3 className="mt-1 text-xl font-semibold">{item.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
