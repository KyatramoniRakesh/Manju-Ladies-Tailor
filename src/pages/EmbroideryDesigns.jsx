import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import ImageModal from "../components/ImageModal";
import {
  embroideryCategories,
  servicesData,
  WHATSAPP_NUMBER,
} from "../data/servicesData";
import { API_URL } from "../config";

const inferEmbroideryCategory = (item) => {
  const text = `${item.name} ${item.category} ${(item.tags || []).join(" ")}`.toLowerCase();
  const matched = embroideryCategories.find(category =>
    category.keywords.some(keyword => text.includes(keyword))
  );

  return matched?.id || item.embroideryCategory || "thread";
};

const EmbroideryDesigns = () => {
  const resultsRef = useRef(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedImg, setSelectedImg] = useState(null);
  const [backendItems, setBackendItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/api/designs/embroidery`)
      .then(res => (res.ok ? res.json() : []))
      .then(data => {
        if (!cancelled) {
          setBackendItems(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
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
  }, []);

  const items = useMemo(() => {
    const uploaded = backendItems.map(item => ({
      ...item,
      id: item._id,
      service: "embroidery",
      embroideryCategory: inferEmbroideryCategory(item),
      images: (item.images || []).map(img => img.startsWith("http") ? img : `${API_URL}${img}`),
    }));

    const dummy = servicesData.embroidery.map(item => ({
      ...item,
      images: [],
      embroideryCategory: item.embroideryCategory || inferEmbroideryCategory(item),
    }));

    return [...uploaded, ...dummy];
  }, [backendItems]);

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesCategory = categoryFilter === "All" || item.embroideryCategory === categoryFilter;
    const searchable = `${item.name} ${item.category} ${(item.tags || []).join(" ")}`.toLowerCase();
    return matchesCategory && searchable.includes(normalizedSearch);
  });

  const categoryCounts = embroideryCategories.reduce((counts, category) => {
    counts[category.id] = items.filter(item => item.embroideryCategory === category.id).length;
    return counts;
  }, {});

  const goToResults = (categoryId) => {
    setCategoryFilter(categoryId);
    window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <>
      <Navbar />
      <main className="bg-[#FAFAFA] pt-16">
        <section
          className="bg-gray-950 py-16 text-white"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(17,24,39,0.92), rgba(157,23,77,0.64)), url('https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1920')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="mx-auto max-w-7xl px-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#FBBF24]">
              Embroidery Design Catalog
            </p>
            <h1 className="mt-4 max-w-4xl font-heading text-5xl font-bold leading-tight md:text-6xl">
              Choose an embroidery design for your blouse
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-100">
              Pick a design first. Then Manju will stitch the blouse with the selected neck, sleeve, back, border, butta, maggam, stone, thread, or zari work.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex bg-[#FBBF24] px-6 py-3 font-semibold text-gray-950 hover:bg-white"
            >
              Ask for Custom Embroidery
            </a>
          </div>
        </section>

        <section className="bg-white py-14">
          <div className="mx-auto max-w-7xl px-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">
                  Categories
                </p>
                <h2 className="mt-3 font-heading text-4xl font-bold text-gray-950">
                  Start with what the customer is looking for
                </h2>
              </div>
              <button
                onClick={() => {
                  setCategoryFilter("All");
                  setSearch("");
                }}
                className="text-sm font-semibold text-[#9D174D]"
              >
                Show all designs
              </button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {embroideryCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => goToResults(category.id)}
                  className={`group text-left shadow-sm ring-1 transition hover:-translate-y-1 hover:shadow-xl ${
                    categoryFilter === category.id ? "ring-[#9D174D]" : "ring-gray-200"
                  }`}
                >
                  <div className="bg-white p-6">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl font-semibold text-gray-950">{category.name}</h3>
                      <span className="bg-[#FDF2F8] px-3 py-1 text-xs font-semibold text-[#9D174D]">
                        {categoryCounts[category.id] || 0}
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-gray-600">{category.description}</p>
                    <p className="mt-6 text-sm font-semibold text-[#9D174D]">View designs</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section ref={resultsRef} className="py-10">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-4 bg-white p-5 shadow-sm ring-1 ring-gray-200 lg:grid-cols-[1fr_260px]">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search neck, sleeve, bridal, stone, butta..."
                className="border border-gray-200 px-4 py-3 outline-none focus:border-[#9D174D]"
              />
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="border border-gray-200 px-4 py-3 outline-none focus:border-[#9D174D]"
              >
                <option value="All">All embroidery categories</option>
                {embroideryCategories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-gray-600">
                {loading ? "Loading uploaded embroidery designs..." : `${filtered.length} embroidery designs visible`}
              </p>
              <button
                onClick={() => {
                  setSearch("");
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
              <p className="py-16 text-center text-gray-500">
                No embroidery designs match this search yet.
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <ImageModal img={selectedImg} onClose={() => setSelectedImg(null)} />
    </>
  );
};

export default EmbroideryDesigns;
