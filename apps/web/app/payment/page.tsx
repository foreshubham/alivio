"use client";

import React, { useState } from "react";
import { useCart } from "@/contexts/cartContext";
import { useOnboarding } from "@/contexts/onboardingContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const { markToolkitPaid } = useOnboarding();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handlePayment = () => {
    if (!name || !email || !phone || !address || !city || !state || !zip) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    // Simulate Cashfree payment
    setTimeout(() => {
      const deliveryDate = new Date(Date.now() + 4 * 86400000).toLocaleDateString();
      cart.forEach((item) => markToolkitPaid(item.id, deliveryDate));
      clearCart();
      toast.success("Payment successful!");
      router.push("/partners/onboarding/pro-id");
      setLoading(false);
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-gray-600">
        Cart is empty. Add toolkits first.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Delivery Address */}
      <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
        <h2 className="text-2xl font-semibold mb-6">Delivery Details</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2"
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-1"
            />
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-1"
            />
            <input
              type="text"
              placeholder="ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 flex-1"
            />
          </div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <ul className="mb-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between py-1">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-semibold text-lg border-t border-gray-300 pt-2">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing Payment..." : "Pay Now"}
        </button>
        <p className="text-gray-500 text-sm mt-2">
          You will be redirected to Cashfree sandbox (dummy) for payment.
        </p>
      </div>
    </div>
  );
}
