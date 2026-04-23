import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ImageModal from "../components/ImageModal";
import { allDummyDesigns, serviceList } from "../data/servicesData";
import { API_URL } from "../config";

const Designs = () => {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);
  const [backendItems, setBackendItems] = useState([]);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      serviceList.map(service =>
        fetch(`${API_URL}/api/designs/${service.id}`)
          .then(res => (res.ok ? res.json() : []))
          .catch(() => [])
      )
    ).then(results => {
      if (!cancelled) {
        setBackendItems(results.flat());
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const items = useMemo(() => {
    const uploaded = backendItems.map(item => ({
      ...item,
      id: item._id,
      images: (item.images || []).map(img => img.startsWith("http") ? img : `${API_URL}${img}`),
    }));

    return [...uploaded, ...allDummyDesigns];
  }, [backendItems]);

  const categories = ["All", ...new Set(items.map(item => item.category).filter(Boolean))];
  const normalizedSearch = search.trim().toLowerCase();
  const filtered = items.filter((item) => {
    const matchesService = serviceFilter === "All" || item.service === serviceFilter;
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    const searchable = `${item.name} ${item.category} ${(item.tags || []).join(" ")}`.toLowerCase();
    return matchesService && matchesCategory && searchable.includes(normalizedSearch);
  });

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAFA] pt-16">
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
              Design Catalog
            </p>
            <h1 className="mt-3 font-heading text-5xl font-bold text-gray-950">
              Search every category in one place
            </h1>
            <p className="mt-4 max-w-2xl text-gray-600">
              Customers can filter by service, category, or words like bridal, simple, stone, sleeves, and fitting.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-4 bg-white p-5 shadow-sm ring-1 ring-gray-200 lg:grid-cols-[1fr_220px_220px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search designs, tags, categories"
                className="border border-gray-200 px-4 py-3 outline-none focus:border-[#9D174D]"
              />
              <select
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
                className="border border-gray-200 px-4 py-3 outline-none focus:border-[#9D174D]"
              >
                <option value="All">All services</option>
                {serviceList.map(service => (
                  <option key={service.id} value={service.id}>{service.name}</option>
                ))}
              </select>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="border border-gray-200 px-4 py-3 outline-none focus:border-[#9D174D]"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="text-sm text-gray-600">{filtered.length} designs visible</p>
              <button
                onClick={() => {
                  setSearch("");
                  setServiceFilter("All");
                  setCategoryFilter("All");
                }}
                className="text-sm font-semibold text-[#9D174D]"
              >
                Clear filters
              </button>
            </div>

            <div className="mt-6 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
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

export default Designs;
