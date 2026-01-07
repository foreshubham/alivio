"use client";

import React, { useState } from "react";
import { useOnboarding } from "@/contexts/onboardingContext";
import { useCart } from "@/contexts/cartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { api } from "@/services/api";

export default function ToolkitPage() {
  const { toolkits } = useOnboarding();
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const isInCart = (id: string) => cart.some((t) => t.id === id);

  /* =========================
     REAL PAYMENT HANDLER
  ========================= */
  const handlePayNow = async () => {
    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    try {
      setLoading(true);

      const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

      // Fake gateway transaction id (replace with Razorpay later)
      const transactionId = `TK-${Date.now()}`;

      await api.post("/partners/toolkit/purchase", {
        transactionId,
        amount: totalAmount
      });

      clearCart();

      toast.success("Toolkit purchased successfully!");

      // Optional: redirect after purchase
      setTimeout(() => {
        router.push("/partners/onboarding/zone");
      }, 1000);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to complete payment"
      );
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Purchase Toolkits
      </h1>

      <p className="text-gray-600 mb-8">
        Browse available toolkits. Add them to cart and complete payment.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {toolkits.map((t) => (
          <div
            key={t.id}
            className="border rounded-lg p-5 flex flex-col bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              src={t.image}
              alt={t.name}
              className="w-full h-40 object-cover rounded-md mb-4"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <p className="text-gray-500 mt-1">₹{t.price}</p>
            </div>

            {isInCart(t.id) ? (
              <button
                className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg"
                onClick={() => removeFromCart(t.id)}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => addToCart(t)}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      {/* CART */}
      {cart.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white border shadow-lg rounded-lg p-4 w-96 z-50">
          <h3 className="font-semibold text-lg mb-2">Your Cart</h3>

          <ul className="max-h-40 overflow-y-auto mb-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-medium mb-3">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={loading}
            onClick={handlePayNow}
            className="w-full py-2 bg-green-600 text-white rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      )}
    </div>
  );
}
