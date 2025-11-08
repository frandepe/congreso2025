import React from "react";
import { motion } from "framer-motion";

interface PageLoaderProps {
  color?: string;
  duration?: number;
}

export const PageLoader: React.FC<PageLoaderProps> = ({
  color = "#E7551E",
  duration = 2.8,
}) => {
  const pulsePath = `
    M 0 50
    L 35 50
    L 38 20
    L 42 80
    L 46 50
    L 80 50
  `;

  const heartPath = `
    M 90 50
    C 90 40, 98 35, 105 42
    C 112 35, 120 40, 120 50
    C 120 65, 105 80, 105 80
    C 105 80, 90 65, 90 50
  `; // 💗 más pequeño y centrado

  const gradientId = `gradient-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      <svg
        className="w-[90vw] h-[220px]"
        viewBox="0 0 130 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Gradiente animado */}
        <defs>
          <motion.linearGradient
            id={gradientId}
            x1="0"
            x2="150"
            gradientUnits="userSpaceOnUse"
            animate={{
              x1: [0, 60],
              x2: [60, 120],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </motion.linearGradient>
        </defs>

        {/* Línea principal */}
        <motion.path
          d={pulsePath}
          stroke={`url(#${gradientId})`}
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1] }}
          transition={{
            duration,
            times: [0, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            filter: `drop-shadow(0 0 5px ${color}80)`,
          }}
        />

        {/* Sombra persistente */}
        <motion.path
          d={pulsePath}
          stroke={color}
          strokeWidth={1.5}
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{
            pathLength: [0, 1, 1],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration,
            times: [0, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Corazón principal con fade-out */}
        <motion.path
          d={heartPath}
          fill={color}
          stroke={color}
          strokeWidth={0.8}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 0, 1.2, 1, 1],
            opacity: [0, 0, 1, 1, 0],
          }}
          transition={{
            duration,
            times: [0, 0.68, 0.78, 0.9, 1],
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            transformOrigin: "105px 65px",
            filter: `drop-shadow(0 0 10px ${color}80)`,
          }}
        />

        {/* Pulso del corazón */}
        <motion.path
          d={heartPath}
          fill="none"
          stroke={color}
          strokeWidth={1}
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: [1, 1, 1, 1.3, 1],
            opacity: [0, 0, 0.8, 0, 0],
          }}
          transition={{
            duration,
            times: [0, 0.68, 0.82, 0.92, 1],
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            transformOrigin: "105px 65px",
          }}
        />

        {/* Texto dentro del corazón */}
        <motion.text
          x="105"
          y="63"
          textAnchor="middle"
          fill="white"
          fontSize="8"
          fontWeight="bold"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0, 0, 1, 1, 0],
            scale: [0.8, 0.8, 1.1, 1, 0.9],
          }}
          transition={{
            duration,
            times: [0, 0.68, 0.8, 0.9, 1],
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            pointerEvents: "none",
          }}
        >
          2026
        </motion.text>
      </svg>
    </div>
  );
};
