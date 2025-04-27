"use client";

import { useEffect, useState } from "react";
import { lokasData } from "@/data/lokas";

/**
 * Invisible navigation component for keyboard users
 * This improves accessibility without adding visible UI elements
 */
export default function AccessibilityNav() {
  const [currentLoka, setCurrentLoka] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Only handle arrow up/down keys
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = Math.min(currentLoka + 1, lokasData.length - 1);
        setCurrentLoka(nextIndex);
        document
          .getElementById(lokasData[nextIndex].id)
          ?.scrollIntoView({ behavior: "smooth" });
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = Math.max(currentLoka - 1, 0);
        setCurrentLoka(prevIndex);
        document
          .getElementById(lokasData[prevIndex].id)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Update current section based on scroll position
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const currentIndex = Math.floor(
        (scrollTop + viewportHeight / 2) / viewportHeight
      );
      if (currentIndex >= 0 && currentIndex < lokasData.length) {
        setCurrentLoka(currentIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentLoka]);

  // This component doesn't render anything visible
  // It only adds keyboard navigation functionality
  return (
    <div className="sr-only" aria-live="polite">
      <p>
        {`Currently viewing: ${lokasData[currentLoka]?.name}. Use arrow keys to navigate between realms.`}
      </p>
    </div>
  );
}
