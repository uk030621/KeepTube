// app/upgrade/page.js
"use client";

import CheckoutButton from "@/components/CheckoutButton";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function UpgradePage() {
  const router = useRouter();

  const handleExit = async () => {
    await signOut({ redirect: false }); // Sign out without auto-redirect
    router.push("/"); // Send user to homepage (or login)
  };
  return (
    <div className="flex flex-col items-center justify-start h-screen  background-container bg-background">
      <h1 className="text-2xl font-bold mt-8 mb-4">Upgrade to Full Access</h1>
      <p className="mb-6 text-center max-w-md">
        You’ve used your 3 free visits. To continue using the Media Library,
        please make a one-time payment.
      </p>
      <CheckoutButton
        items={[
          {
            name: "Full Access",
            description: "One-time payment for full app access",
            price: 999, // £9.99 or your amount in minor units
            quantity: 1,
            image: "https://example.com/access-image.png",
          },
        ]}
      />
      <button
        onClick={handleExit}
        className="mt-5 text-sm bg-purple-600 text-white p-3 rounded-md"
      >
        No thanks, exit application.
      </button>
    </div>
  );
}
