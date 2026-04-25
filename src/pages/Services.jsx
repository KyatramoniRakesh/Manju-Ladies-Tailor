import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { embroideryService, serviceList } from "../data/servicesData";
import useSiteAssets from "../hooks/useSiteAssets";

const Services = ({ embedded = false }) => {
  const siteAssets = useSiteAssets();
  const visibleServices = [embroideryService, ...serviceList];

  const content = (
    <section id="services" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
            Services
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-gray-950 md:text-5xl">
            Stitching services after the design is chosen
          </h1>
          <p className="mt-4 text-gray-600">
            Customers can choose embroidery designs first, then check blouse, dress, lehenga, and alteration work here.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <Link
              key={service.id}
              to={service.id === "embroidery" ? "/embroidery-designs" : `/services/${service.id}`}
              className="group overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={siteAssets[`service-${service.id}`] || service.image}
                alt={service.name}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#9D174D]">
                  {service.category}
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-gray-950">{service.name}</h2>
                <p className="mt-3 text-sm leading-6 text-gray-600">{service.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {service.highlights.map((item) => (
                    <span key={item} className="bg-[#FDF2F8] px-3 py-1 text-xs font-medium text-[#9D174D]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );

  if (embedded) {
    return content;
  }

  return (
    <>
      <Navbar />
      <main className="pt-16">{content}</main>
      <Footer />
    </>
  );
};

export default Services;
