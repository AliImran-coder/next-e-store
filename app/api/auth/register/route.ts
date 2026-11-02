import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Customer from "@/models/Customer";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();
    if (!email || !password || String(password).length < 6) 
    return NextResponse.json(
  { message: "Enter an email and a password of at least 6 characters." },
   { status: 400 }
  );
    await dbConnect();
    const normalizedEmail = String(email).trim().toLowerCase();
    if (await Customer.findOne({ email: normalizedEmail })) 
      
      return NextResponse.json({ message: "An account with this email already exists." }, 
      { status: 409 });
    const customer = await Customer.create(
      { name: String(name || ""), 
        email: normalizedEmail, 
        password: await bcrypt.hash(String(password), 10) 
      });
    const response = NextResponse.json({ success: true });
    response.cookies.set("customerSession", String(customer._id), 
    { httpOnly: true, secure: process.env.NODE_ENV === "production", 
      sameSite: "lax", 
      path: "/", maxAge: 60 * 60 * 24 * 7
    });

    return response;

  } catch {
    return NextResponse.json({ message: "Registration failed." }, { status: 500 });
  }
}
