"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#5A9E3E", // Principal
    "#1D3B1F", // Principal
    "#F7941D", // Principal
    "#2F5A30", // Transición oscura
    "#3C5E2D", // Transición oscura
    "#F0831D", // Transición suave y oscura
    "#3D4D30", // Transición oscura
    "#3A5A3D", // Transición oscura
    "#5A7A42", // Transición suave
    "#3C5D3A", // Transición oscura
  ];

  const linearGradients = [
    "linear-gradient(to bottom right, #292929, #5A9E3E)", // Oscuro a principal
    "linear-gradient(to bottom right, #1D3B1F, #5A9E3E)", // Oscuro a principal
    "linear-gradient(to bottom right, #F7941D, #2F5A30)", // Principal a oscuro
    "linear-gradient(to bottom right, #3C5E2D, #3A5A3D)", // Oscuro a suave
    "linear-gradient(to bottom right, #F1A145, #F0831D)", // Transición suave y oscura
    "linear-gradient(to bottom right, #3D4D30, #3C5D3A)", // Oscuro a suave
    "linear-gradient(to bottom right, #3A5A3D, #3D4D30)", // Oscuro a suave
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 p-10"
      ref={ref}
    >
      <div className="relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "h-60 w-80 rounded-md bg-white sticky top-20 overflow-hidden flex justify-center items-center",
          contentClassName
        )}
      >
        <img
          src={content[activeCard]?.content ?? null}
          alt={content[activeCard]?.title ?? "Image"}
          className="max-w-[70%] max-h-[70%] object-contain"
        />
      </div>
    </motion.div>
  );
};
