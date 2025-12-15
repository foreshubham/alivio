"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: (
      <>
        No Tension <br />
        <span className="text-blue-700 font-bold">Alivio</span> is the solution!
      </>
    ),
    subtitle: "Your multi-service platform for all daily needs.",
    ctaText: "GET IN TOUCH",
    imageUrl: "/bg.png", // Replace with actual image path or URL
  },
  {
    id: 2,
    title: (
      <>
        Join <br />
        <span className="text-blue-700 font-bold">Alivio Technologies</span> today!
      </>
    ),
    subtitle: "Grow your business by offering services on our platform.",
    ctaText: "BECOME A PARTNER",
    imageUrl: "/bg.png", // Another image if you want multiple slides
  },
  // Add more slides if needed
];

export default function ServiceProviderCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full bg-blue-50 rounded-lg overflow-hidden flex flex-col md:flex-row items-center px-6 py-12 md:py-20 gap-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex].id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="flex-1 max-w-full"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-black mb-4">
            {slides[currentIndex].title}
          </h2>
          <p className="text-lg text-gray-700 mb-6">{slides[currentIndex].subtitle}</p>
          <a
            href="#contact"
            className="inline-flex items-center text-blue-700 font-semibold underline hover:text-blue-900"
          >
            {slides[currentIndex].ctaText}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </a>
        </motion.div>

        <motion.div
          key={slides[currentIndex].id + "-image"}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
          className="flex-1 flex justify-center max-w-full"
        >
          <img
            src={slides[currentIndex].imageUrl}
            alt="Service Provider"
            className="w-full max-h-96 object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="absolute bottom-6 right-6 flex space-x-3 z-10">
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="bg-white rounded-full shadow p-2 hover:bg-gray-100 transition"
        >
          ›
        </button>
      </div>
    </section>
  );
}
