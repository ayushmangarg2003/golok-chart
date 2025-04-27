"use client";

import { motion } from "framer-motion";

/**
 * Component to render subtle background decorative elements based on each Loka
 * Can be expanded in future to add more complex designs per Loka
 */
export default function BackgroundElements({ lokaId, color, opacity = 0.05 }) {
  // Different background patterns based on Loka type
  const renderElements = () => {
    // For higher realms - more ethereal, light patterns
    if (
      [
        "satya-loka",
        "tapa-loka",
        "jana-loka",
        "mahar-loka",
        "svar-loka",
      ].includes(lokaId)
    ) {
      return (
        <div className="higher-realm-elements">
          {/* Circle patterns representing spiritual elevation */}
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="decorative-circle"
              style={{
                position: "absolute",
                width: `${(i + 2) * 10}vw`,
                height: `${(i + 2) * 10}vw`,
                borderRadius: "50%",
                border: `1px solid ${color}`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: (opacity / (i + 1)) * 2,
              }}
              animate={{
                scale: [1, 1.02, 1],
                opacity: [
                  (opacity / (i + 1)) * 2,
                  (opacity / (i + 1)) * 3,
                  (opacity / (i + 1)) * 2,
                ],
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      );
    }

    // For middle realms - balanced, structured patterns
    else if (["bhuvar-loka", "bhu-loka"].includes(lokaId)) {
      return (
        <div className="middle-realm-elements">
          {/* Grid pattern representing structure and balance */}
          <svg
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: opacity * 2,
            }}
          >
            <defs>
              <pattern
                id={`grid-${lokaId}`}
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${lokaId})`} />
          </svg>
        </div>
      );
    }

    // For lower realms - more dense, chaotic patterns
    else {
      return (
        <div className="lower-realm-elements">
          {/* Random lines representing complexity and density */}
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={`line-${i}`}
              style={{
                position: "absolute",
                width: "100vw",
                height: "1px",
                background: color,
                top: `${10 + i * 8}%`,
                opacity: opacity,
                transformOrigin: i % 2 === 0 ? "left" : "right",
              }}
              animate={{
                scaleX: [0.3, 0.7, 0.3],
                opacity: [opacity, opacity * 2, opacity],
                x: i % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div
      className="loka-background-elements"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      {renderElements()}
    </div>
  );
}
