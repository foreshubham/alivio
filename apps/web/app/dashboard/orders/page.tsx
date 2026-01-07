"use client";

import React from "react";
import {
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

/* =============================
   Types
============================= */

type OrderStatus = "NEW" | "ACCEPTED" | "COMPLETED" | "CANCELLED";

type Order = {
  id: string;
  customerName: string;
  service: string;
  address: string;
  time: string;
  phone: string;
  status: OrderStatus;
};

/* =============================
   Page
============================= */

export default function OrdersPage() {
  // Later this will come from API
  const orders: Order[] = [
    {
      id: "ORD-1021",
      customerName: "Rahul Sharma",
      service: "AC Repair",
      address: "Sector 62, Noida",
      time: "Today • 4:00 PM",
      phone: "98XXXXXX21",
      status: "NEW",
    },
    {
      id: "ORD-1020",
      customerName: "Anita Verma",
      service: "Washing Machine Service",
      address: "Indirapuram, Ghaziabad",
      time: "Today • 12:30 PM",
      phone: "97XXXXXX88",
      status: "ACCEPTED",
    },
    {
      id: "ORD-1019",
      customerName: "Suresh Kumar",
      service: "RO Installation",
      address: "Vaishali, Ghaziabad",
      time: "Yesterday • 5:00 PM",
      phone: "99XXXXXX12",
      status: "COMPLETED",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-xl border border-slate-200/70 p-6">
          <h1 className="text-xl font-semibold text-slate-900">
            Service Orders
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            View and manage service requests assigned to you
          </p>
        </div>

        {/* ================= ORDERS ================= */}
        {orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* =============================
   Order Card
============================= */

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200/70 p-6 hover:shadow-sm transition">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        {/* Left */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-slate-900">
              {order.service}
            </h3>
            <StatusBadge status={order.status} />
          </div>

          <p className="text-sm text-slate-700">
            {order.customerName}
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={12} />
            {order.address}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={12} />
            {order.time}
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${order.phone}`}
            className="flex items-center gap-1 text-sm px-3 py-2 rounded-md bg-slate-100 hover:bg-slate-200 transition"
          >
            <Phone size={14} />
            Call
          </a>

          {order.status === "NEW" && (
            <>
              <button className="px-4 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 transition">
                Accept
              </button>
              <button className="px-4 py-2 text-sm rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition">
                Reject
              </button>
            </>
          )}

          {order.status === "ACCEPTED" && (
            <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 transition">
              Mark Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

/* =============================
   Status Badge
============================= */

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const map: Record<OrderStatus, { label: string; className: string }> = {
    NEW: {
      label: "New",
      className: "bg-yellow-50 text-yellow-700",
    },
    ACCEPTED: {
      label: "Accepted",
      className: "bg-blue-50 text-blue-700",
    },
    COMPLETED: {
      label: "Completed",
      className: "bg-emerald-50 text-emerald-700",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-red-50 text-red-600",
    },
  };

  return (
    <span
      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${map[status].className}`}
    >
      {map[status].label}
    </span>
  );
};

/* =============================
   Empty State
============================= */

const EmptyState = () => (
  <div className="bg-white rounded-xl border border-slate-200/70 p-12 text-center">
    <AlertCircle className="mx-auto text-slate-400" size={32} />
    <p className="mt-3 text-sm text-slate-600">
      No service requests assigned yet.
    </p>
  </div>
);
