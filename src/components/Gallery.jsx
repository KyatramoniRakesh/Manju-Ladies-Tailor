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
            <Link
              key={item.id}
              to={item.service === "embroidery" ? `/embroidery-designs#${item.id}` : `/services/${item.service}#${item.id}`}
              className="group flex min-h-[19rem] flex-col justify-between bg-white p-6 shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="inline-flex w-fit bg-[#FDF2F8] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
                {item.category}
              </div>
              <div className="mt-10">
                <h3 className="text-2xl font-semibold text-gray-950">{item.name}</h3>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  A popular design customers can review quickly before sending a WhatsApp enquiry.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {(item.tags || []).slice(0, 3).map(tag => (
                  <span key={tag} className="bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
