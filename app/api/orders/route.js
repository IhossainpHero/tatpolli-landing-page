import connectDB from "@/app/lib/dbConnect";
import Order from "../../models/Order";

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // Create a new order using the Mongoose model
    const newOrder = await Order.create(body);

    // Return a success response
    return NextResponse.json({
      success: true,
      data: newOrder,
      message: "Order placed successfully!",
    });
  } catch (error) {
    // Return an error response if something goes wrong
    console.error("Error placing order:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to place order.",
      },
      { status: 500 }
    );
  }
}
