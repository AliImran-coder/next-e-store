import mongoose, { Schema } from "mongoose";

const CustomerSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String, default: "" },
  address: { type: String, default: "" },
  cart: { type: Array, default: [] },
}, { timestamps: true });

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
