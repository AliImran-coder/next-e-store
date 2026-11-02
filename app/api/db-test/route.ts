
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();

    return NextResponse.json({
      success: true,
      message: "MongoDB connected successfully!",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "MongoDB connection failed. Check your configuration.",
      },
      { status: 500 }
    );
  }
}
