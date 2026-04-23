import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import designRoutes from "./routes/designRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI in backend/.env");
  process.exit(1);
}

if (!ADMIN_PASSWORD) {
  console.warn("ADMIN_PASSWORD is not configured. Admin actions will fail until it is set.");
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });

app.use("/api/designs", designRoutes);

app.post("/api/admin/login", (req, res) => {
  if (!ADMIN_PASSWORD) {
    return res.status(500).json({ message: "ADMIN_PASSWORD is not configured." });
  }

  if (req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid admin password." });
  }

  res.json({ token: ADMIN_PASSWORD });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
