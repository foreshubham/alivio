"use client";

import { useCart } from "@/contexts/cartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link href="/partners/onboarding/buy-toolkit" className="text-blue-600 underline">Browse toolkits</Link></p>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center border p-4 rounded">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-600">₹{item.price}</p>
                  </div>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="font-semibold text-lg">Total: ₹{total}</p>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              onClick={() => {
                // handle payment here
                alert("Proceeding to payment...");
              }}
            >
              Pay Now
            </button>
          </div>

          <button
            className="mt-4 text-sm text-gray-500 underline"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
