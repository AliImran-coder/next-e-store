
import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import { products as existingProducts } from "@/redux/features/product/productSlice";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter a question." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { success: false, message: "Your message is too long." },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, message: "Groq API key is not configured." },
        { status: 500 }
      );
    }

    
    let storeProducts;

    try {
      await dbConnect();

      storeProducts = await Product.find()
        .select("id name price stock category detail")
        .limit(100)
        .lean();
    } catch (error) {
      console.error("MongoDB product lookup failed:", error);
    }

     
    if (!storeProducts || storeProducts.length === 0) {
      storeProducts = existingProducts;
    }

    const productInformation = storeProducts.map((product) => ({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.detail || "No description available.",
    }));

     
    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item: { role?: string; text?: string }) =>
              ["user", "model", "assistant"].includes(item.role || "") &&
              typeof item.text === "string"
          )
          .slice(-6)
      : [];

    const previousMessages = safeHistory.map(
      (item: { role: string; text: string }) => ({
        role: item.role === "user" ? "user" as const : "assistant" as const,
        content: item.text.slice(0, 1000),
      })
    );

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",

      messages: [
        {
          role: "system",
          content: `
You are the friendly customer support assistant for E-Store.

Here is the current store product information:

${JSON.stringify(productInformation, null, 2)}

Your responsibilities:
- Help customers understand available products.
- Answer questions about product names, prices, stock and categories.
- Help customers browse products and understand the cart and checkout.
- Be polite, friendly and easy to understand.
Formatting instructions:
- Use Markdown formatting in your responses.
- Use **bold text** for product names, prices and important information.
- Use headings when explaining multiple topics.
- Use bullet points for features and product lists.
- Use numbered lists for step-by-step instructions.
- Use Markdown tables when comparing multiple products.
- Keep paragraphs short and readable.
- Never show raw Markdown symbols unnecessarily.
- Do not put the entire response inside a code block.

Important rules:
- Use the supplied product information as your source of truth.
- Never invent products, prices, stock quantities or features.
- If a product is not listed, say you cannot find it in the current catalog.
- If stock is 0, say it is out of stock.
- Never invent delivery charges, delivery times, discounts or return policies.
- If information is unavailable, suggest contacting the store.
- Never ask for passwords or payment card details.
- Never claim that you have placed an order or changed an account.
          `,
        },
        ...previousMessages,
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.4,
      max_completion_tokens: 500,
    });

    const reply =
      response.choices[0]?.message?.content ||
      "Sorry, I could not generate an answer. Please try again.";

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Groq chatbot error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "The chatbot is temporarily unavailable.",
      },
      { status: 500 }
    );
  }
}
