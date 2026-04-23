import { SHOP_ADDRESS, WHATSAPP_NUMBER } from "../data/servicesData";

const Contact = () => {
  return (
    <section className="bg-[#FDF2F8] py-20" id="contact">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
            Contact
          </p>
          <h2 className="mt-3 font-heading text-4xl font-bold text-gray-950 md:text-5xl">
            Visit or message for stitching enquiries
          </h2>
          <div className="mt-8 space-y-3 text-gray-700">
            <p>{SHOP_ADDRESS}</p>
            <p>+91 7893767001</p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
          >
            Chat on WhatsApp
          </a>
        </div>

        <iframe
          className="h-96 w-full border-0"
          src="https://www.google.com/maps?q=KP%20street%20Jadcherla%20Mahabubnagar%20Telangana%20509406&output=embed"
          title="Manju Ladies Tailors location map"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
