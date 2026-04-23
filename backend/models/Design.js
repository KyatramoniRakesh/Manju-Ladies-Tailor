import mongoose from "mongoose";

const designSchema = new mongoose.Schema({
  name: String,
  category: String,
  service: String, // embroidery, blouse etc
  tags: [String],
  images: [String],
}, { timestamps: true });

export default mongoose.model("Design", designSchema);