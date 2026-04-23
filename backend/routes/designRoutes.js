import express from "express";
import multer from "multer";
import fs from "fs";
import Design from "../models/Design.js";
import { requireAdmin } from "../middleware/adminAuth.js";

const router = express.Router();
const uploadDir = "uploads/";

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed."));
    }
    cb(null, true);
  },
});

const parseTags = (tags = "") =>
  tags.split(",").map(tag => tag.trim()).filter(Boolean);

const deleteUploadedFile = (imagePath) => {
  if (!imagePath?.startsWith("/uploads/")) {
    return;
  }

  const localPath = imagePath.replace(/^\/uploads\//, `${uploadDir}`);
  fs.rm(localPath, { force: true }, () => {});
};

const handleUploadErrors = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  return res.status(400).json({ message: err.message || "Upload failed." });
};

// Admin: list all uploaded designs
router.get("/", requireAdmin, async (req, res) => {
  try {
    const designs = await Design.find().sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch designs", error: error.message });
  }
});

// Upload Design
router.post("/", requireAdmin, upload.array("images"), handleUploadErrors, async (req, res) => {
  try {
    const files = req.files || [];

    if (!req.body.name || !req.body.category || !req.body.service) {
      return res.status(400).json({ message: "Name, category, and service are required." });
    }

    if (files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image." });
    }

    const imagePaths = files.map(file => `/uploads/${file.filename}`);

    const design = new Design({
      name: req.body.name,
      category: req.body.category,
      service: req.body.service,
      tags: parseTags(req.body.tags),
      images: imagePaths,
    });

    await design.save();
    res.status(201).json(design);
  } catch (error) {
    res.status(500).json({ message: "Could not upload design", error: error.message });
  }
});

// Update Design
router.put("/:id", requireAdmin, upload.array("images"), handleUploadErrors, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found." });
    }

    design.name = req.body.name || design.name;
    design.category = req.body.category || design.category;
    design.service = req.body.service || design.service;
    design.tags = parseTags(req.body.tags);

    const newImages = (req.files || []).map(file => `/uploads/${file.filename}`);
    if (newImages.length > 0) {
      design.images.forEach(deleteUploadedFile);
      design.images = newImages;
    }

    await design.save();
    res.json(design);
  } catch (error) {
    res.status(500).json({ message: "Could not update design", error: error.message });
  }
});

// Delete Design
router.delete("/:id", requireAdmin, async (req, res) => {
  try {
    const design = await Design.findByIdAndDelete(req.params.id);

    if (!design) {
      return res.status(404).json({ message: "Design not found." });
    }

    design.images.forEach(deleteUploadedFile);
    res.json({ message: "Design deleted." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete design", error: error.message });
  }
});

// Get Designs
router.get("/:service", async (req, res) => {
  try {
    const designs = await Design.find({ service: req.params.service }).sort({ createdAt: -1 });
    res.json(designs);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch designs", error: error.message });
  }
});

export default router;
