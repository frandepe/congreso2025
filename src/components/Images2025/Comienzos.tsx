import { motion } from "framer-motion";
import React from "react";

interface ImageRevealProps {
  leftImage: string;
  middleImage: string;
  rightImage: string;
}

export default function ImageReveal({
  leftImage,
  middleImage,
  rightImage,
}: ImageRevealProps) {
  return (
    <div className="my-12 w-full flex justify-center">
      {/* 🔴 MOBILE (stack limpio) */}
      <div className="flex gap-3 sm:hidden">
        {[leftImage, middleImage, rightImage].map((img, i) => (
          <div
            key={i}
            className="w-24 h-32 overflow-hidden rounded-lg shadow-md bg-white"
          >
            <img src={img} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      {/* 🟢 DESKTOP (tu efecto bien hecho) */}
      <div className="relative hidden sm:flex h-[320px] w-[420px] items-center justify-center">
        {/* LEFT */}
        <motion.div
          className="absolute w-60 h-60 rounded-xl overflow-hidden shadow-lg bg-white"
          initial={{ rotate: -8, x: -190, y: 10 }}
          whileHover={{ rotate: 0, scale: 1.1, zIndex: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <img
            src={leftImage}
            className="w-full h-full object-cover p-2 rounded-xl"
          />
        </motion.div>

        {/* MIDDLE */}
        <motion.div
          className="absolute w-60 h-60 rounded-xl overflow-hidden shadow-lg bg-white"
          initial={{ rotate: 6 }}
          whileHover={{ rotate: 0, y: -10, scale: 1.1, zIndex: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <img
            src={middleImage}
            className="w-full h-full object-cover p-2 rounded-xl"
          />
        </motion.div>

        {/* RIGHT */}
        <motion.div
          className="absolute w-60 h-60 rounded-xl overflow-hidden shadow-lg bg-white"
          initial={{ rotate: -6, x: 190, y: 20 }}
          whileHover={{ rotate: 0, scale: 1.1, zIndex: 50 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <img
            src={rightImage}
            className="w-full h-full object-cover p-2 rounded-xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
