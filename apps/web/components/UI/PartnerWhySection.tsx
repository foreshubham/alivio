"use client";

import { FaRocket, FaBolt, FaShieldAlt } from "react-icons/fa";

const items = [
  {
    icon: FaRocket,
    title: "Build and scale faster",
    desc: "Whether you’re onboarding service partners or expanding into new cities, Alivio provides a scalable technology foundation to launch and grow faster.",
  },
  {
    icon: FaBolt,
    title: "Give your operations superpowers",
    desc: "From automated onboarding and payouts to real-time tracking, dashboards, and support tools — we empower your team to operate efficiently.",
  },
  {
    icon: FaShieldAlt,
    title: "Trusted and verified ecosystem",
    desc: "Every partner on Alivio goes through strict verification, compliance checks, and quality standards — ensuring reliability and trust.",
  },
];

export default function PartnerWhySection() {
  return (
    <section className="w-full bg-white py-20" 
    style={{backgroundImage: "url('/g1.webp')", backgroundSize:"contain" ,
     backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Why partner with <br className="hidden sm:block" />
            <span className="text-[#1346AF]">Alivio Technology</span>?
          </h2>

          {/* RIGHT */}
          <div className="space-y-10">
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="
                    flex gap-5 p-6 rounded-xl
                    border border-[#E0E7FF] bg-white
                    cursor-pointer
                    transition-all duration-300 ease-out
                    hover:-translate-y-1
                    hover:border-[#1346AF]
                    hover:shadow-[0_14px_30px_-10px_rgba(19,70,175,0.35)]
                  "
                >
                  {/* ICON */}
                  <div
                    className="
                      w-12 h-12 aspect-square shrink-0
                      flex items-center justify-center
                      rounded-full
                      bg-[#EEF2FF] text-[#1346AF]
                    "
                  >
                    <Icon size={18} />
                  </div>

                  {/* CONTENT */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
