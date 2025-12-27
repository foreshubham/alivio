"use client";

import React from "react";
import { useOnboarding } from "@/contexts/onboardingContext";
import { useCart } from "@/contexts/cartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ToolkitPage() {
  const { toolkits, markToolkitPaid } = useOnboarding();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const isInCart = (id: string) => cart.some((t) => t.id === id);

  const handlePayNow = () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const deliveryDate = new Date(
      Date.now() + 4 * 86400000
    ).toLocaleDateString();

    cart.forEach((item) => markToolkitPaid(item.id, deliveryDate));
    clearCart();

    toast.success("Payment successful! Toolkits marked as paid.");
  };

  const handleNextStep = () => {
    router.push("/partners/onboarding/zone"); // replace with your next step route
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Purchase Toolkits</h1>
      <p className="text-gray-600 mb-8">
        Browse our available toolkits below. Add them to your cart and complete payment to unlock your PRO ID.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {toolkits.map((t) => (
          <div
            key={t.id}
            className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between bg-white shadow-sm transition hover:shadow-md"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{t.name}</h2>
              <p className="text-gray-500 mt-1">₹{t.price}</p>
              {t.paid && t.deliveryDate && (
                <p className="mt-2 text-green-600 font-medium text-sm">
                  ✔ Paid • Delivery: {t.deliveryDate}
                </p>
              )}
            </div>

            {!t.paid ? (
              isInCart(t.id) ? (
                <button
                  className="mt-4 w-full py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
                  onClick={() => removeFromCart(t.id)}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="mt-4 w-full py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                  onClick={() => addToCart(t)}
                >
                  Add to Cart
                </button>
              )
            ) : (
              <div className="mt-4 w-full py-2 text-center text-gray-500 text-sm font-medium border border-gray-200 rounded-lg bg-gray-50">
                Payment Completed
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Floating Cart / Pay Now Section */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 shadow-lg rounded-lg p-4 w-96 flex flex-col gap-3 z-50">
          {/* Heading & Paragraph */}
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Pay for Your Toolkit</h3>
            <p className="text-gray-600 text-sm mt-1">
              Review your cart and click "Pay Now" to complete the payment. Once paid, proceed to the next step of onboarding.
            </p>
          </div>

          <ul className="flex flex-col gap-1 max-h-40 overflow-y-auto mt-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700 text-sm">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center font-medium text-gray-800 mt-2">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={handlePayNow}
            className="mt-2 w-full py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Pay Now
          </button>

          <button
            onClick={handleNextStep}
            className="mt-2 w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Proceed to Next Step
          </button>
        </div>
      )}
    </div>
  );
}
