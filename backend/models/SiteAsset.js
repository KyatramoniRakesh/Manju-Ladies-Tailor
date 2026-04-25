import mongoose from "mongoose";

const siteAssetSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model("SiteAsset", siteAssetSchema);
