"use client";

import React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

type InfiniteImageScrollerProps = {
  images: {
    src: string;
    alt?: string;
  }[];
  speed?: number; // pixels per second
  container?: "fluid" | "7xl";
};

export default function InfiniteImageScroller({
  images,
  speed = 50,
  container = "7xl",
}: InfiniteImageScrollerProps) {
  // Duplicate the images for seamless looping
  const repeatedImages = [...images, ...images];

  return (
    <div
      className={`overflow-hidden ${
        container === "7xl"
          ? "mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"
          : "w-full"
      }`}
    >
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: (images.length * 200) / speed,
            ease: "linear",
          },
        }}
      >
        {repeatedImages.map((img, idx) => (
          <div key={idx} className="mx-6 flex shrink-0 items-center">
            <div className="relative h-20 w-40 grayscale opacity-80 transition hover:grayscale-0 hover:opacity-100">
              <Image src={img.src} alt={img.alt ?? "Scrolling image"} fill className="object-contain" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
