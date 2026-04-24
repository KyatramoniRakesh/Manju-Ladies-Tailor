const PROD_API_URL = "https://manju-ladies-tailor-2.onrender.com";

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:5000" : PROD_API_URL);
