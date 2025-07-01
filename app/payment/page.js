import CheckoutButton from "@/components/CheckoutButton";

export default function CartPage() {
  const cartItems = [
    {
      name: "Pro Plan",
      description: "Access to all features",
      image: "https://your-image-url.com/pro.png",
      price: 20, // 20 gbp
      quantity: 1,
    },
  ];

  return (
    <div className="p-6 max-w-xl mx-auto m-0 text-center background-container ">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <CheckoutButton items={cartItems} />
    </div>
  );
}
