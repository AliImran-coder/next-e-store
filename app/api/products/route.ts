
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { products as starterProducts } from "@/redux/features/product/productSlice";
import { isAdmin } from "@/lib/session";

export async function GET() {
  try {
    await dbConnect();

    const productCount = await Product.countDocuments();

    if (productCount === 0) {
      await Product.insertMany(starterProducts);
    }

    const products = await Product.find()
      .select("-_id -__v")
      .lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      { message: "Could not load products" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { message: "Admin login required" },
        { status: 401 }
      );
    }

    await dbConnect();

    const products = await request.json();

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { message: "Invalid products" },
        { status: 400 }
      );
    }

    for (const product of products) {
      await Product.findOneAndUpdate(
        { id: product.id },
        product,
        { upsert: true, new: true }
      );
    }

    const ids = products.map((p: { id: number }) => p.id);

    await Product.deleteMany({ id: { $nin: ids } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SAVE PRODUCTS ERROR:", error);

    return NextResponse.json(
      { message: "Could not save products" },
      { status: 500 }
    );
  }
}
