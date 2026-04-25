import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  serviceCategoryOptions,
  SHOP_NAME,
  uploadServiceList,
} from "../data/servicesData";
import { API_URL } from "../config";

const tokenKey = "manju-admin-token";
const loginTimeKey = "manju-admin-login-time";
const maxSessionMs = 60 * 60 * 1000;
const inactivityMs = 30 * 60 * 1000;

const emptyForm = {
  name: "",
  category: "",
  service: "",
  tags: "",
  images: [],
};

const getImageUrl = (image) => {
  if (!image) return "";
  return image.startsWith("http") ? image : `${API_URL}${image}`;
};

const getServiceName = (serviceId) =>
  uploadServiceList.find(service => service.id === serviceId)?.name || serviceId || "Unknown";

const categoryOptionsFor = (service) => serviceCategoryOptions[service] || [];

const Admin = () => {
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);
  const [token, setToken] = useState(() => localStorage.getItem(tokenKey) || "");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editForm, setEditForm] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [status, setStatus] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [productSearch, setProductSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");

  const previews = useMemo(
    () => form.images.map(file => ({ name: file.name, url: URL.createObjectURL(file) })),
    [form.images]
  );

  const authHeaders = token ? { "x-admin-token": token } : {};

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    const logoutNow = () => {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(loginTimeKey);
      setToken("");
      setDesigns([]);
      setStatus("Admin session expired. Please login again.");
    };

    const loginAt = Number(localStorage.getItem(loginTimeKey) || Date.now());
    const age = Date.now() - loginAt;

    if (age >= maxSessionMs) {
      logoutNow();
      return undefined;
    }

    let inactivityTimer = window.setTimeout(logoutNow, inactivityMs);
    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    const resetTimer = () => {
      window.clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(logoutNow, inactivityMs);
    };

    const expiryTimer = window.setTimeout(logoutNow, maxSessionMs - age);

    activityEvents.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      window.clearTimeout(inactivityTimer);
      window.clearTimeout(expiryTimer);
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [token]);

  useEffect(() => {
    let cancelled = false;

    if (!token) {
      return undefined;
    }

    fetch(`${API_URL}/api/designs`, {
      headers: { "x-admin-token": token },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Please login again.");
        }
        return response.json();
      })
      .then(data => {
        if (!cancelled) {
          setDesigns(data);
        }
      })
      .catch(error => {
        if (!cancelled) {
          setStatus(error.message);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [token, refreshKey]);

  const stats = useMemo(() => {
    const byService = uploadServiceList.map(service => ({
      ...service,
      count: designs.filter(design => design.service === service.id).length,
    }));
    const imageCount = designs.reduce((total, design) => total + (design.images?.length || 0), 0);

    return {
      total: designs.length,
      imageCount,
      embroidery: byService.find(service => service.id === "embroidery")?.count || 0,
      byService,
    };
  }, [designs]);

  const filteredDesigns = useMemo(() => {
    const query = productSearch.trim().toLowerCase();

    return designs.filter(design => {
      const matchesService = serviceFilter === "All" || design.service === serviceFilter;
      const searchable = `${design.name} ${design.category} ${design.service} ${(design.tags || []).join(" ")}`.toLowerCase();
      return matchesService && searchable.includes(query);
    });
  }, [designs, productSearch, serviceFilter]);

  const handleLogin = async () => {
    setLoginStatus("Checking...");

    try {
      const response = await fetch(`${API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem(tokenKey, data.token);
      localStorage.setItem(loginTimeKey, String(Date.now()));
      setToken(data.token);
      setPassword("");
      setLoginStatus("");
    } catch (error) {
      setLoginStatus(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(loginTimeKey);
    setToken("");
    setDesigns([]);
  };

  const updateFormService = (service) => {
    const options = categoryOptionsFor(service);
    setForm({ ...form, service, category: options[0] || "" });
  };

  const updateEditService = (service) => {
    const options = categoryOptionsFor(service);
    setEditForm({ ...editForm, service, category: options[0] || "" });
  };

  const buildData = (source) => {
    const data = new FormData();
    data.append("name", source.name);
    data.append("category", source.category);
    data.append("service", source.service);
    data.append("tags", source.tags);
    source.images.forEach(img => data.append("images", img));
    return data;
  };

  const clearUpload = () => {
    setForm(emptyForm);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!form.name || !form.category || !form.service || form.images.length === 0) {
      setStatus("Please fill name, category, service, and choose at least one image.");
      return;
    }

    setStatus("Uploading...");

    try {
      const response = await fetch(`${API_URL}/api/designs`, {
        method: "POST",
        headers: authHeaders,
        body: buildData(form),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Upload failed");
      }

      clearUpload();
      setStatus("Uploaded successfully.");
      setRefreshKey(key => key + 1);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const startEdit = (design) => {
    setEditForm({
      id: design._id,
      name: design.name || "",
      category: design.category || "",
      service: design.service || "",
      tags: (design.tags || []).join(", "),
      images: [],
      currentImages: design.images || [],
    });
  };

  const saveEdit = async () => {
    if (!editForm.name || !editForm.category || !editForm.service) {
      setStatus("Edit needs name, category, and service.");
      return;
    }

    setStatus("Saving...");

    try {
      const response = await fetch(`${API_URL}/api/designs/${editForm.id}`, {
        method: "PUT",
        headers: authHeaders,
        body: buildData(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Update failed");
      }

      setEditForm(null);
      if (editFileInputRef.current) {
        editFileInputRef.current.value = "";
      }
      setStatus("Updated successfully.");
      setRefreshKey(key => key + 1);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const deleteDesign = async (design) => {
    const confirmed = window.confirm(`Delete "${design.name}"?`);
    if (!confirmed) return;

    setStatus("Deleting...");

    try {
      const response = await fetch(`${API_URL}/api/designs/${design._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Delete failed");
      }

      setStatus("Deleted successfully.");
      setRefreshKey(key => key + 1);
    } catch (error) {
      setStatus(error.message);
    }
  };

  if (!token) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF2F8] px-5">
        <section className="w-full max-w-md bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">Admin Login</p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-gray-950">{SHOP_NAME}</h1>
          <p className="mt-3 text-sm text-gray-600">Login to upload, edit, or delete products.</p>
          <p className="mt-2 text-xs text-gray-500">Auto logout after 30 minutes of inactivity. Maximum session 1 hour.</p>
          <input
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
            onKeyDown={event => event.key === "Enter" && handleLogin()}
            placeholder="Admin password"
            className="mt-6 w-full border border-gray-200 p-3 outline-none focus:border-[#9D174D]"
          />
          <button onClick={handleLogin} className="mt-4 w-full bg-[#9D174D] px-6 py-3 font-semibold text-white hover:bg-[#831843]">
            Login
          </button>
          {loginStatus && <p className="mt-4 text-sm text-gray-700">{loginStatus}</p>}
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF2F8] px-5 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9D174D]">Dashboard</p>
            <h1 className="mt-2 font-heading text-4xl font-bold text-gray-950">Admin Panel</h1>
            <p className="mt-2 text-gray-600">{SHOP_NAME} product and design manager</p>
          </div>
          <div className="flex gap-3">
            <Link to="/embroidery-designs" className="bg-white px-5 py-3 text-sm font-semibold text-[#9D174D] ring-1 ring-gray-200">
              View Site
            </Link>
            <button onClick={logout} className="bg-gray-950 px-5 py-3 text-sm font-semibold text-white">
              Logout
            </button>
          </div>
        </header>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <div className="bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">Total Products</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">{stats.total}</p>
          </div>
          <div className="bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">Embroidery Designs</p>
            <p className="mt-2 text-3xl font-bold text-[#9D174D]">{stats.embroidery}</p>
          </div>
          <div className="bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">Uploaded Images</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">{stats.imageCount}</p>
          </div>
          <div className="bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <p className="text-sm text-gray-500">Categories</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">{new Set(designs.map(design => design.category)).size}</p>
          </div>
        </section>

        <section className="mt-4 grid gap-3 md:grid-cols-5">
          {stats.byService.map(service => (
            <button
              key={service.id}
              onClick={() => setServiceFilter(service.id)}
              className={`bg-white p-4 text-left shadow-sm ring-1 transition ${
                serviceFilter === service.id ? "ring-[#9D174D]" : "ring-gray-200 hover:ring-[#9D174D]"
              }`}
            >
              <p className="text-sm font-semibold text-gray-950">{service.name}</p>
              <p className="mt-1 text-2xl font-bold text-[#9D174D]">{service.count}</p>
            </button>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <h2 className="text-xl font-semibold text-gray-950">Upload Product</h2>
            <p className="mt-1 text-sm text-gray-500">Choose service first, then select the correct category.</p>
            <div className="mt-5 grid gap-4">
              <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" placeholder="Product or design name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <select className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" value={form.service} onChange={e => updateFormService(e.target.value)}>
                <option value="">Select service</option>
                {uploadServiceList.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
              </select>
              <select className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} disabled={!form.service}>
                <option value="">Select category</option>
                {categoryOptionsFor(form.service).map(category => <option key={category} value={category}>{category}</option>)}
              </select>
              <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" placeholder="Tags, example: bridal, stone, heavy" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
              <input ref={fileInputRef} className="border border-gray-200 p-3" type="file" multiple accept="image/*" onChange={e => setForm({ ...form, images: [...e.target.files] })} />
              <button className="bg-[#9D174D] px-6 py-3 font-semibold text-white hover:bg-[#831843]" onClick={handleSubmit}>
                Upload Product
              </button>
              {status && <p className="text-sm text-gray-700">{status}</p>}
              <div className="grid grid-cols-2 gap-3">
                {previews.map(preview => (
                  <img key={preview.url} src={preview.url} alt={preview.name} className="h-28 w-full object-cover" />
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-950">Products</h2>
                <p className="mt-1 text-sm text-gray-500">{filteredDesigns.length} visible products</p>
              </div>
              <button onClick={() => setRefreshKey(key => key + 1)} className="text-sm font-semibold text-[#9D174D]">Refresh</button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-[1fr_220px]">
              <input
                value={productSearch}
                onChange={event => setProductSearch(event.target.value)}
                placeholder="Search products"
                className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]"
              />
              <select value={serviceFilter} onChange={event => setServiceFilter(event.target.value)} className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]">
                <option value="All">All services</option>
                {uploadServiceList.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
              </select>
            </div>

            <div className="mt-5 grid gap-4">
              {filteredDesigns.map(design => (
                <div key={design._id} className="grid gap-4 border border-gray-200 p-4 md:grid-cols-[96px_1fr_auto]">
                  <img src={getImageUrl(design.images?.[0])} alt={design.name} className="h-24 w-24 bg-gray-100 object-cover" />
                  <div>
                    <h3 className="font-semibold text-gray-950">{design.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">{getServiceName(design.service)} / {design.category}</p>
                    <p className="mt-1 text-xs text-gray-500">{(design.tags || []).join(", ") || "No tags"}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <button onClick={() => startEdit(design)} className="bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800">
                      Edit
                    </button>
                    <button onClick={() => deleteDesign(design)} className="bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {filteredDesigns.length === 0 && <p className="text-sm text-gray-500">No products match this view.</p>}
            </div>
          </section>
        </div>

        {editForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <section className="w-full max-w-2xl bg-white p-6 shadow-xl">
              <div className="flex items-start justify-between gap-4">
                <h2 className="font-heading text-3xl font-bold text-gray-950">Edit Product</h2>
                <button onClick={() => setEditForm(null)} className="text-sm font-semibold text-gray-600">Close</button>
              </div>
              <div className="mt-5 grid gap-4">
                <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
                <select className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" value={editForm.service} onChange={e => updateEditService(e.target.value)}>
                  {uploadServiceList.map(service => <option key={service.id} value={service.id}>{service.name}</option>)}
                </select>
                <select className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" value={editForm.category} onChange={e => setEditForm({ ...editForm, category: e.target.value })}>
                  {categoryOptionsFor(editForm.service).map(category => <option key={category} value={category}>{category}</option>)}
                </select>
                <input className="border border-gray-200 p-3 outline-none focus:border-[#9D174D]" value={editForm.tags} onChange={e => setEditForm({ ...editForm, tags: e.target.value })} />
                <div className="grid grid-cols-3 gap-3">
                  {editForm.currentImages.map(image => (
                    <img key={image} src={getImageUrl(image)} alt={editForm.name} className="h-24 w-full object-cover" />
                  ))}
                </div>
                <input ref={editFileInputRef} className="border border-gray-200 p-3" type="file" multiple accept="image/*" onChange={e => setEditForm({ ...editForm, images: [...e.target.files] })} />
                <p className="text-xs text-gray-500">Choosing new images replaces the old images.</p>
                <button onClick={saveEdit} className="bg-[#9D174D] px-6 py-3 font-semibold text-white hover:bg-[#831843]">
                  Save Changes
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
