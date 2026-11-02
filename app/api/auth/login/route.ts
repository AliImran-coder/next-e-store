import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await dbConnect();

    const customer = await Customer.findOne({ email: String(email).trim().toLowerCase() });
    if (!customer || !(await bcrypt.compare(String(password), customer.password))) {
      return NextResponse.json({ message: "Email or password is incorrect." }, { status: 401 });
    }
    const response = NextResponse.json({ success: true, customer: { name: customer.name, email: customer.email } });
    response.cookies.set("customerSession", String(customer._id), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7 });
    return response;
  } catch {
    return NextResponse.json({ message: "Login failed." }, { status: 500 });
  }
}
