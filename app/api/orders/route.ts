import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import { getCustomerId } from "@/lib/session";

export async function GET() {
  const customerId = await getCustomerId();
  if (!customerId) return NextResponse.json({ message: "Please log in." }, { status: 401 });
  await dbConnect();
  const orders = await Order.find({ customerid: customerId }).sort({ createdAt: -1 }).select("-_id -__v").lean();
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const customerId = await getCustomerId();
  if (!customerId) return NextResponse.json({ message: "Please log in before placing an order." }, { status: 401 });
  try {
    const order = await request.json();
    await dbConnect();
    const saved = await Order.create({ ...order, customerid: customerId });
    return NextResponse.json({ success: true, order: saved }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Could not save your order." }, { status: 500 });
  }
}
