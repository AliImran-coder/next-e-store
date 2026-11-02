import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";
import { getCustomerId } from "@/lib/session";

export async function GET() {
  const id = await getCustomerId();
  if (!id) 
  return NextResponse.json({ items: [] });
  await dbConnect();
  const customer = await Customer.findById(id).select("cart");
  return NextResponse.json({ items: customer?.cart || [] });
}
export async function PUT(request: Request) {
  const id = await getCustomerId();
  if (!id) return NextResponse.json(
    { message: "Please log in to save your cart." }, 
    { status: 401 });
  try {
    const { items } = await request.json();
    await dbConnect();
    await Customer.findByIdAndUpdate(id, { cart: items });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: "Could not save cart." }, { status: 500 });
  }
}
