import { Link } from "react-router-dom";
import {
  serviceList,
  SHOP_ADDRESS,
  SHOP_EMAIL,
  SHOP_NAME,
  socialLinks,
  WHATSAPP_NUMBER,
} from "../data/servicesData";

const iconClass = "h-4 w-4 shrink-0";

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
    <path d="M12 21s6-4.35 6-11a6 6 0 1 0-12 0c0 6.65 6 11 6 11Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={iconClass}>
    <path d="M4 6h16v12H4z" />
    <path d="m4 8 8 6 8-6" />
  </svg>
);

const SocialIcon = ({ type }) => {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
        <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === "facebook") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.6-1.6H17V3.8c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4.1V10H8v3h2.8v8h2.7Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M23 7s-.2-1.7-.8-2.5c-.8-1-1.7-1-2.1-1.1C17.2 3.2 12 3.2 12 3.2h0s-5.2 0-8.1.2c-.4 0-1.3.1-2.1 1.1C1.2 5.3 1 7 1 7S.8 9 .8 11v2c0 2 .2 4 .2 4s.2 1.7.8 2.5c.8 1 1.9 1 2.4 1.1 1.8.2 7.8.2 7.8.2s5.2 0 8.1-.2c.4 0 1.3-.1 2.1-1.1.6-.8.8-2.5.8-2.5s.2-2 .2-4v-2c0-2-.2-4-.2-4ZM9.8 15.2V8.8l6.2 3.2-6.2 3.2Z" />
    </svg>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-950 px-5 py-12 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr_1fr]">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white">{SHOP_NAME}</h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">
            Embroidery design selection, blouse stitching, dresses, lehengas, and alterations.
          </p>
          <div className="mt-6 flex gap-3">
            {Object.entries(socialLinks).map(([key, value]) => (
              <a key={key} href={value} target="_blank" rel="noreferrer" className="inline-flex h-10 w-10 items-center justify-center bg-white/5 text-white hover:bg-white/10" aria-label={key}>
                <SocialIcon type={key} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Services</h3>
          <div className="mt-4 grid gap-2 text-sm">
            <Link to="/embroidery-designs" className="hover:text-white">Embroidery Designs</Link>
            {serviceList.map((service) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className="hover:text-white"
              >
                {service.name}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-gray-400">
            <div className="flex gap-3">
              <LocationIcon />
              <p>{SHOP_ADDRESS}</p>
            </div>
            <div className="flex gap-3">
              <MailIcon />
              <a href={`mailto:${SHOP_EMAIL}`} className="hover:text-white">{SHOP_EMAIL}</a>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex bg-green-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-7xl border-t border-gray-800 pt-6 text-sm text-gray-500">
        Copyright 2026 {SHOP_NAME}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
