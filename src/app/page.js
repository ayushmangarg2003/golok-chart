'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LokaSection from '@/components/LokaSection';
import AccessibilityNav from '@/components/AccessibilityNav';
import { lokasData } from '@/data/lokas';
import { useAnimations } from '@/hooks/useAnimations';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const { scrollPosition } = useAnimations();
  
  // Handle client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate scroll progress
  const scrollProgress = isMounted 
    ? (scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    : 0;

  if (!isMounted) {
    // Show loading screen while client-side rendering is in progress
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <main className="loka-container">
      {/* Accessibility keyboard navigation */}
      <AccessibilityNav />
      
      {/* Subtle scroll progress indicator */}
      <motion.div 
        className="scroll-progress" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '3px',
          backgroundColor: 'rgba(255,255,255,0.5)',
          zIndex: 100,
          width: `${scrollProgress}%`
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollPosition > 100 ? 0.7 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Map through Lokas data and render each section */}
      <AnimatePresence>
        {lokasData.map((loka) => (
          <LokaSection
            key={loka.id}
            loka={loka}
          />
        ))}
      </AnimatePresence>
      
      {/* Skip to content link for accessibility */}
      <a 
        href="#satya-loka" 
        className="sr-only focus:not-sr-only" 
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          background: '#333',
          color: 'white',
          zIndex: 1000,
          textDecoration: 'none'
        }}
      >
        Skip to content
      </a>
    </main>
  );
}