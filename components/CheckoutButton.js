"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutButton({ items }) {
  const { data: session } = useSession();
  //const [currency, setCurrency] = useState("gbp");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!session?.user?.email) {
      alert("Please log in to continue.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          email: session.user.email,
          //currency,
        }),
      });

      const { sessionId, error } = await res.json();

      if (error || !sessionId) {
        throw new Error(error || "Unable to create Stripe session.");
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error(err);
      alert("Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/*<label className="text-sm font-medium text-gray-700">
        Choose your currency:
      </label>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="p-2 border rounded-md text-gray-800"
      >
        <option value="gbp">GBP (£)</option>
        <option value="usd">USD ($)</option>
        <option value="eur">EUR (€)</option>
      </select>*/}

      <button
        onClick={handleCheckout}
        className={`bg-green-700 text-white px-6 py-2 rounded hover:bg-green-600 transition ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Redirecting..." : "Go to Payment: £2.99"}
      </button>
    </div>
  );
}
