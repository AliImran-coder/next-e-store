import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  id: { type: String, required: true, unique: true },
  customerid: { type: String, required: true, index: true },
  items: { type: Array, required: true },
  total: { type: Number, required: true },
  createdat: { type: String, required: true },
  name: String,
  email: String,
  phone: String,
  address: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
