import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  detail: { type: String, default: "" },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: { type: [String], default: [] },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
