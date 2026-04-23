import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import ImageModal from "../components/ImageModal";
import { getServiceById, servicesData } from "../data/servicesData";
import { API_URL } from "../config";

const ServiceDetails = () => {
  const { type } = useParams();
  const service = getServiceById(type);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);
  const [backendItems, setBackendItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/designs/${type}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Backend is not available");
        }
        return res.json();
      })
      .then(data => {
        if (!cancelled) {
          setBackendItems(data);
          setError("");
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setBackendItems([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [type]);

  const items = useMemo(() => {
    const savedItems = backendItems.map(item => ({
      ...item,
      id: item._id,
      service: item.service || type,
      images: (item.images || []).map(img => img.startsWith("http") ? img : `${API_URL}${img}`),
    }));

    return [...savedItems, ...(servicesData[type] || [])];
  }, [backendItems, type]);

  const categories = ["All", ...new Set(items.map(i => i.category).filter(Boolean))];
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = items.filter((item) => {
    const matchesCategory = filter === "All" || item.category === filter;
    const searchable = `${item.name} ${item.category} ${(item.tags || []).join(" ")}`.toLowerCase();
    return matchesCategory && searchable.includes(normalizedSearch);
  });

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAFA] pt-16">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <Link to="/services" className="text-sm font-semibold text-[#9D174D]">
              Back to Services
            </Link>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
                  {service?.category || "Service"}
                </p>
                <h1 className="mt-3 font-heading text-5xl font-bold text-gray-950">
                  {service?.name || `${type} Designs`}
                </h1>
                <p className="mt-4 max-w-2xl text-gray-600">
                  {service?.description || "Browse uploaded and sample designs for this service."}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {(service?.highlights || ["Search", "Filter", "Enquire"]).map((item) => (
                  <div key={item} className="bg-[#FDF2F8] p-4 text-center text-sm font-semibold text-[#9D174D]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-7xl px-5">
            <div className="bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by design name, category, or tag"
                  className="w-full border border-gray-200 px-4 py-3 outline-none focus:border-[#9D174D]"
                />
                <Filters categories={categories} selected={filter} setSelected={setFilter} />
              </div>
            </div>

            {loading && <p className="mt-6 text-center text-gray-500">Loading uploaded designs...</p>}
            {error && (
              <p className="mt-6 text-center text-amber-700">
                Showing sample designs because the backend is not running.
              </p>
            )}

            <div className="mt-8 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map(item => (
                <ProductCard key={item.id} item={item} onClick={setSelectedImg} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="py-16 text-center text-gray-500">No designs match this search yet.</p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ImageModal img={selectedImg} onClose={() => setSelectedImg(null)} />
    </>
  );
};

export default ServiceDetails;
