import { NextResponse } from "next/server";
import Stripe from "stripe";
import { headers } from "next/headers";
import connectDB from "@/lib/mongodbmongoose";
import User from "@/models/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const sig = headers().get("stripe-signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Stripe signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await connectDB();

    const result = await User.findOneAndUpdate(
      { email: session.customer_email },
      { access: "paid", visitCount: 0 }
    );

    console.log(`✅ Updated user ${session.customer_email} to paid`, result);
  }

  return new NextResponse("Webhook received", { status: 200 });
}
