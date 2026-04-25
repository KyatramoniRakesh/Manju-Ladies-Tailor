import express from "express";
import multer from "multer";
import SiteAsset from "../models/SiteAsset.js";
import { requireAdmin } from "../middleware/adminAuth.js";
import { resolveImagePath, deleteUploadedFile } from "../utils/imageStorage.js";

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image uploads are allowed."));
    }
    cb(null, true);
  },
});

const handleUploadErrors = (err, req, res, next) => {
  if (!err) {
    return next();
  }

  return res.status(400).json({ message: err.message || "Upload failed." });
};

router.get("/", async (req, res) => {
  try {
    const assets = await SiteAsset.find().sort({ key: 1 });
    res.json(assets);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch site assets", error: error.message });
  }
});

router.put("/:key", requireAdmin, upload.single("image"), handleUploadErrors, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image." });
    }

    const image = await resolveImagePath(req.file, "manju-ladies-tailors/site-assets");
    const existingAsset = await SiteAsset.findOne({ key: req.params.key });

    if (existingAsset?.image) {
      deleteUploadedFile(existingAsset.image);
    }

    const asset = await SiteAsset.findOneAndUpdate(
      { key: req.params.key },
      { key: req.params.key, image },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: "Could not update site asset", error: error.message });
  }
});

export default router;
