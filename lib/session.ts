import { cookies } from "next/headers";
import Customer from "@/models/Customer";
import dbConnect from "@/lib/mongodb";

export async function getCustomer() {
  const cookieStore = await cookies();
  const customerId = cookieStore.get("customerSession")?.value;
  if (!customerId) return null;
  await dbConnect();
  return Customer.findById(customerId).select("-password");
}

export async function getCustomerId() {
  const cookieStore = await cookies();
  return cookieStore.get("customerSession")?.value || null;
}

export async function isAdmin() {
  const cookieStore = await cookies();
  return cookieStore.get("adminSession")?.value === process.env.ADMIN_SESSION_SECRET;
}
