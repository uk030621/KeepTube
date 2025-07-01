import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//const SUPPORTED_CURRENCIES = ["gbp", "usd", "eur"]; // You can add more if needed

export async function POST(req) {
  try {
    const { email } = await req.json();
    console.log("Email passed to session:", email);

    // Default to GBP if currency is not provided or unsupported
    /*const chosenCurrency = SUPPORTED_CURRENCIES.includes(
      currency?.toLowerCase()
    )
      ? currency.toLowerCase()
      : "gbp";*/

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price: "price_1Rg6oNGSWIWOn8Xh7MUQyzRI",
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success`,
      cancel_url: `${req.nextUrl.origin}/cancel`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Error creating Stripe session" },
      { status: 500 }
    );
  }
}
