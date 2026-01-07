"use client";

import { motion } from "framer-motion";
import { Link } from "lucide-react";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const teamMembers = [
  { name: "Soumen Das", role: "Founder & CEO", image: "/team/soumen.jpg" },
  { name: "Akashay Mathur", role: "Advisor", image: "/team/ak.png" },
  { name: "Kaushik Basak", role: "CMO", image: "/team/kb.jpg" },
  { name: "Neeraj Khurana", role: "CFO", image: "/team/nk.jpg" },
  {
    name: "Deepannita Paul",
    role: "Back Operation Manager",
    image: "/team/dp.jpg",
  },
  { name: "Shubham Singh", role: "Developer", image: "/team/ss.png" },
  { name: "Mr. Amit Ghosh", role: "CA", image: "/team/ag.png" },
];

export default function AboutUsPage() {
  return (
    <main className="bg-white font-sans">
      {/* HERO */}
      <section
        className="py-28 text-center px-6 bg-linear-to-b from-[#EEF2FF] to-white"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/futuristic-techno-low-poly-mesh-lines-background-data-communication_1017-60106.jpg?semt=ais_hybrid&w=740&q=80')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover", // <-- change this
          backgroundPosition: "center",
        }}
      >
        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-xs md:text-sm uppercase tracking-widest text-[#1346AF]"
        >
          About Us
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-5xl font-bold mt-2 text-gray-900 leading-tight"
        >
          Alivio Technology <br className="hidden md:block" />
          Making Home Services{" "}
          <span className="text-[#1346AF]">Effortless</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Simplifying everyday home services with verified professionals,
          transparent pricing, and dependable support — all in one trusted
          platform.
        </motion.p>
      </section>

      {/* WHO WE ARE */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs uppercase tracking-widest text-[#1346AF]">
              Our Mission
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mt-2">
              Who We Are
            </h2>
            <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
              Alivio Technology is a modern home services platform connecting
              you with skilled, verified professionals for AC repair, cleaning,
              pest control, vehicle servicing, and more.
            </p>
            <p className="mt-3 text-sm md:text-base text-gray-600 leading-relaxed">
              Our mission is simple — to replace uncertainty and hassle with
              transparency, quality, and peace of mind.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="/g/g1.jpeg"
              alt="Alivio home services"
              width={600}
              height={450}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-[#1346AF]"
          >
            Meet the Team
          </motion.span>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-gray-900 mt-2"
          >
            The People Behind Alivio
          </motion.h2>

          <p className="mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            A passionate team committed to delivering reliable, high-quality
            home services you can trust.
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden border border-[#E0E7FF] shadow-sm hover:shadow-md transition"
              >
                <div className="relative h-72 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs md:text-sm text-[#1346AF] font-medium">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* GALLERY */}
      <section className="py-24 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold text-gray-900"
          >
            Our Gallery
          </motion.h2>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "/g/g1.jpeg",
              "/g/g2.jpeg",
              "/g/g3.jpeg",
              "/g/g4.jpeg",
              "/g/g5.jpeg",
              "/g/g6.jpeg",
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform"
              >
                <Image
                  src={img}
                  alt="Alivio service"
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="py-24 bg-[#1346AF] text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-2xl md:text-4xl font-bold text-white"
        >
          Your Home, Our Responsibility
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm md:text-base text-white/90 max-w-xl mx-auto"
        >
          Trusted professionals, dependable service, and complete peace of mind
          — every single time.
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <a href="/our-services">
            <button className="px-8 py-3 bg-white text-[#1346AF] font-semibold rounded-lg hover:bg-gray-100 transition">
              Book a Service
            </button>
          </a>
        </motion.div>
      </section>
    </main>
  );
}
