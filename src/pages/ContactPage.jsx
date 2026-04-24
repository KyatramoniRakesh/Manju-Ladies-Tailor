import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SHOP_ADDRESS, SHOP_EMAIL, WHATSAPP_NUMBER } from "../data/servicesData";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const mailtoLink = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent(
    form.subject || "Query from website"
  )}&body=${encodeURIComponent(
    `Name: ${form.name}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
  )}`;

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAFA] pt-16">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
              Contact
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-gray-950">
              Queries, comments, and enquiries
            </h1>
            <p className="mt-4 max-w-2xl text-gray-600">
              Reach out for blouse stitching, embroidery selection, fitting queries, comments, or appointment requests.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-2xl font-semibold text-gray-950">Visit or Contact</h2>
              <div className="mt-6 space-y-5 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-950">Address</p>
                  <p className="mt-1 leading-6">{SHOP_ADDRESS}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-950">WhatsApp</p>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="mt-1 inline-block text-[#9D174D]">
                    +91 7893767001
                  </a>
                </div>
                <div>
                  <p className="font-semibold text-gray-950">Email</p>
                  <a href={`mailto:${SHOP_EMAIL}`} className="mt-1 inline-block text-[#9D174D]">
                    {SHOP_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
              <h2 className="text-2xl font-semibold text-gray-950">Send an Enquiry</h2>
              <div className="mt-6 grid gap-4">
                <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" placeholder="Your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" placeholder="Phone number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                <textarea className="min-h-40 border border-gray-200 p-3 outline-none focus:border-[#9D174D]" placeholder="Tell us your requirement, comment, or enquiry" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                <a href={mailtoLink} className="inline-flex items-center justify-center bg-[#9D174D] px-6 py-3 font-semibold text-white hover:bg-[#831843]">
                  Send by Email
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
