import { NextResponse } from "next/server";
export async function POST(request: Request) 
{
  const { email, password } = await request.json();
  if (email !== process.env.ADMIN_EMAIL || 
    password !== process.env.ADMIN_PASSWORD || 
    !process.env.ADMIN_SESSION_SECRET) 
  {
    return NextResponse.json({ message: "Invalid email or password." },
       { status: 401 });
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set("adminSession", process.env.ADMIN_SESSION_SECRET,
  { httpOnly: true, secure: process.env.NODE_ENV === "production", 
  sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  
  return response;
}
