import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SHOP_NAME, WHATSAPP_NUMBER } from "../data/servicesData";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Embroidery Designs", path: "/embroidery-designs" },
  { label: "Services", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link to="/" className="font-heading text-2xl font-bold text-[#9D174D]">
          {SHOP_NAME}
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) =>
            item.path ? (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition ${
                    isActive ? "text-[#9D174D]" : "text-gray-700 hover:text-[#9D174D]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ) : null
          )}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noreferrer"
          className="hidden bg-[#9D174D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#831843] md:inline-flex"
        >
          Book Now
        </a>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation menu"
          className="inline-flex h-10 w-10 items-center justify-center text-[#9D174D] md:hidden"
        >
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M6 6 18 18" />
              <path d="M18 6 6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-5 pb-5 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {navItems.map((item) =>
              item.path ? (
                <Link key={item.label} to={item.path} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ) : null
            )}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="bg-[#9D174D] px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
