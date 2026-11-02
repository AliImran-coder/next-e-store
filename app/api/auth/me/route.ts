import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/session";

export async function GET() {

  const customer = await getCustomer();

  return NextResponse.json
  (
    { loggedIn: Boolean(customer), customer: customer ? 
    { name: customer.name, email: customer.email } : null }
    
  );
}
