"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import InfiniteImageScroller from "@/components/UI/InfiniteImageScroller";
import PartnerWhySection from "@/components/UI/PartnerWhySection";

/* =====================================================
   DESIGN SYSTEM PRIMITIVES 
===================================================== */

function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
      {children}
    </div>
  );
}

function Section({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section {...props} className={`py-24 ${className}`}>
      {children}
    </section>
  );
}

function Hero() {
  return (
    <Section className="relative overflow-hidden bg-linear-to-b from-white via-slate-50 to-white">
      {/* Background image layer */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/bgImage1.png')" }}
      />

      {/* Content */}
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-slate-900 lg:text-5xl">
              A reliable technology partner for serious businesses
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Alivio Technology enables partners to build, operate, and scale
              with stable systems, structured onboarding, and long-term support.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/partners"
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-7 py-3 text-sm font-medium text-white transition hover:bg-indigo-700"
              >
                Apply as a Partner
              </Link>
              <Link
                href="#process"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-7 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400"
              >
                View Partnership Process
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-500">
              Clear terms • Secure onboarding • Dedicated support
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"

            // style={{backgroundImage: "url('/h1.png')"}}
          >
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
              <div className="space-y-4">
                <div className="h-3 w-32 rounded bg-slate-200" />
                <div className="h-3 w-full rounded bg-slate-100" />
                <div className="h-3 w-5/6 rounded bg-slate-100" />
                <div className="h-3 w-2/3 rounded bg-slate-100" />
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
      <InfiniteImageScroller
        container="7xl"
        speed={45}
        images={[
          { src: "/hotel/lalit.png" },
          { src: "/hotel/leela.png" },
          { src: "/hotel/obr.png" },
          { src: "/hotel/itc.webp" },
          { src: "/hotel/orchid.webp" },
        ]}
      />
    </Section>
  );
}

/* =====================================================
   WHO THIS IS FOR (SELF-QUALIFICATION)
===================================================== */

const segments = [
  {
    title: "Early-Stage Startups",
    desc: "Founders building their first production-ready systems.",
  },
  {
    title: "Local & Regional Businesses",
    desc: "Businesses transitioning into structured digital operations.",
  },
  {
    title: "Service & Operations Partners",
    desc: "Teams delivering services within a trusted ecosystem.",
  },
  {
    title: "Growth-Focused Enterprises",
    desc: "Organizations scaling with reliability and governance.",
  },
];

function Audience() {
  return (
    <Section
      className="bg-white py-24"
      style={{
        backgroundImage: "url('/dots.png')",
        backgroundSize: "",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left",
      }}
    >
      <Container>
        {/* HEADER */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow / Overline */}
          <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">
            Who this is for
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            Designed for partners who value stability
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Alivio works best with teams focused on long-term collaboration,
            operational discipline, and sustainable growth — not short-term
            experiments.
          </p>
        </div>

        {/* SEGMENTS */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {segments.map((s) => (
            <div
              key={s.title}
              className="
                group rounded-2xl border border-slate-200 bg-white p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:border-slate-300
                hover:shadow-md
              "
            >
              <h3 className="text-sm font-semibold text-slate-900">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* =====================================================
   VALUE PROPOSITION (OUTCOME-FOCUSED)
===================================================== */

const benefits = [
  {
    title: "Production-Ready Technology",
    desc: "Systems built for performance, security, and scale.",
  },
  {
    title: "Structured Enablement",
    desc: "Clear workflows, documentation, and onboarding.",
  },
  {
    title: "Brand & Platform Association",
    desc: "Operate under a growing and credible technology brand.",
  },
  {
    title: "Ongoing Partner Support",
    desc: "Real communication channels and technical assistance.",
  },
];

function Value() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">
              What partners receive
            </h2>
            <p className="mt-4 max-w-lg text-slate-600">
              Beyond software, Alivio provides the structure required to operate
              confidently at scale.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="text-sm font-semibold text-slate-900">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* =====================================================
   PROCESS (REDUCES ANXIETY)
===================================================== */

const process = [
  "Submit partner application",
  "Internal verification & review",
  "One-time onboarding fee",
  "Activation & access enablement",
];

function Process() {
  return (
    <Section id="process">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold text-slate-900">
            Partnership process
          </h2>
          <p className="mt-4 text-slate-600">
            A clear, transparent onboarding flow with no hidden steps.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-4">
          {process.map((step, i) => (
            <div key={step} className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {i + 1}
              </div>
              <p className="mt-4 text-sm text-slate-700">{step}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* =====================================================
   PRICING (TRANSPARENCY)
===================================================== */

function Pricing() {
  return (
    <Section className="bg-slate-50">
      <Container>
        <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-12 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Partner onboarding fee
          </h2>
          <div className="mt-6 text-5xl font-semibold text-indigo-600">
            ₹200
          </div>
          <p className="mt-3 text-sm text-slate-600">
            One-time, non-refundable
          </p>

          <ul className="mt-8 space-y-2 text-sm text-slate-600">
            <li>• Partner verification</li>
            <li>• Platform access configuration</li>
            <li>• Support channel activation</li>
          </ul>
        </div>
      </Container>
    </Section>
  );
}

/* =====================================================
   FINAL CTA
===================================================== */

function FinalCTA() {
  return (
    <Section>
      <Container>
        <div className="rounded-3xl bg-indigo-600 px-10 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold">
            Begin your partnership with Alivio
          </h2>
          <p className="mt-4 text-indigo-100">
            Apply once. Get verified. Build with confidence.
          </p>
          <Link
            href="/partner/apply"
            className="mt-8 inline-flex rounded-xl bg-white px-8 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            Apply as a Partner
          </Link>
        </div>
      </Container>
    </Section>
  );
}

/* =====================================================
   PAGE
===================================================== */

export default function PartnerHomePage() {
  return (
    <main className="text-slate-900">
      <Hero />

      <PartnerWhySection />
      <Audience />
      <Value />
      <Process />
      <Pricing />
      <FinalCTA />
    </main>
  );
}
