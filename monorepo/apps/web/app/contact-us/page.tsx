"use client";

import { FaMailBulk, FaMapPin, FaPhone } from "react-icons/fa";

/* =====================================================
CONTACT PAGE – ENTERPRISE / PIXEL-PERFECT
===================================================== */

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      {children}
    </div>
  );
}

/* ================= HERO STRIP ================= */

function ContactHero() {
  return (
    <div className="relative h-[300px] w-full overflow-hidden bg-[#bfe5ea]">
      {/* background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#b9e3e8] via-[#ccecf0] to-[#dff4f7]" />

      {/* decorative phone cut */}
      <div className="pointer-events-none absolute right-[-40px] top-[-20px] h-[380px] w-[380px] rounded-full bg-white/10" />

      <div className="relative z-10 flex h-full items-center justify-center">
        <h1 className="text-sm font-semibold uppercase tracking-[0.35em] text-white">
          CONTACT US
        </h1>
      </div>
    </div>
  );
}

/* ================= CONTACT INFO ================= */

function ContactInfo() {
  return (
    <div className="pt-2">
      <h2 className="text-[22px] font-semibold text-[#111827]">Contact Info</h2>
      <p className="mt-2 text-[13px] text-[#6b7280]">
        Some information that you may want to know
      </p>

      <div className="mt-10 space-y-7">
        {/* Phone */}
        <div className="flex gap-3">
          <FaPhone className="mt-[2px] h-4 w-4 text-[#111827]" />
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#111827]">
              Phone Number
            </p>
            <p className="mt-1 text-[14px] text-[#374151]">9051551925</p>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-3">
          <FaMailBulk className="mt-[2px] h-4 w-4 text-[#111827]" />
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#111827]">
              Email
            </p>
            <p className="mt-1 text-[14px] text-[#374151]">
              info@aliviotechnologies.com
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="flex gap-3">
          <FaMapPin className="mt-[2px] h-4 w-4 text-[#111827]" />
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wide text-[#111827]">
              Address
            </p>
            <p className="mt-1 max-w-sm text-[14px] leading-relaxed text-[#374151]">
              No.8 Bijoynagar – Naihati – Pincode 743165.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= CONTACT FORM ================= */

function ContactForm() {
  return (
    <div className="rounded-[28px] bg-white p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <h3 className="text-xl font-semibold text-slate-900">
        Leave Your Message
      </h3>
      <p className="mt-2 text-sm text-slate-500">
        Feel free to contact with us by using the form below
      </p>

      <form className="mt-10 space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500"
          />
          <input
            type="tel"
            placeholder="Mobile"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500"
          />
        </div>

        <textarea
          placeholder="Message"
          rows={5}
          className="w-full resize-none rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-500"
        />

        <button
          type="submit"
          className="mt-4 rounded-full bg-[#5b74e8] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#4f67d8]"
        >
          SEND US
        </button>
      </form>
    </div>
  );
}

/* ================= PAGE ================= */

export default function ContactPage() {
  return (
    <main className="bg-white">
      <ContactHero />

      <section className="py-24">
        <Container>
          <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>
    </main>
  );
}
