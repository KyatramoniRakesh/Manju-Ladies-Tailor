import { Link } from "react-router-dom";
import { serviceList, SHOP_ADDRESS, SHOP_NAME, WHATSAPP_NUMBER } from "../data/servicesData";

const Footer = () => {
  return (
    <footer className="bg-gray-950 px-5 py-12 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">{SHOP_NAME}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
            Embroidery design selection, blouse stitching, dresses, lehengas, and alterations.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white">Services</h3>
          <div className="mt-4 grid gap-2 text-sm">
            {serviceList.map((service) => (
              <Link
                key={service.id}
                to={service.id === "embroidery" ? "/embroidery-designs" : `/services/${service.id}`}
                className="hover:text-white"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <p className="mt-4 text-sm">{SHOP_ADDRESS}</p>
          <p className="mt-2 text-sm">+91 7893767001</p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 text-sm text-gray-500">
        Copyright 2026 {SHOP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
