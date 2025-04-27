'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import BackgroundElements from './BackgroundElements';
import { useAnimations } from '@/hooks/useAnimations';

// Helper function to determine text color based on background brightness
const getTextColor = (hexColor) => {
  // Convert hex to RGB
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  
  // Calculate brightness using perceived luminance formula
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
  
  // Return white text for dark backgrounds, dark grey for light backgrounds
  return brightness > 0.65 ? '#333333' : '#ffffff';
};

export default function LokaSection({ loka }) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });
  const { isMobile, getAnimationSpeed } = useAnimations();
  
  const textColor = getTextColor(loka.color);
  const animationDuration = getAnimationSpeed(1); // Base 1 second duration
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: animationDuration, 
        ease: "easeInOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: animationDuration * 0.7, ease: "easeOut" }
    }
  };

  return (
    <motion.section
      id={loka.id}
      ref={sectionRef}
      className="loka-section"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: loka.color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        padding: isMobile ? '1rem' : '2rem',
        overflow: 'hidden',
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {/* Background decorative elements */}
      <BackgroundElements 
        lokaId={loka.id}
        color={textColor}
        opacity={0.05}
      />
      
      <div className="loka-content" style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
      }}>
        {loka.imgSrc && (
          <motion.div 
            variants={itemVariants}
            className="loka-image"
            style={{
              position: 'relative',
              width: isMobile ? '100px' : '150px',
              height: isMobile ? '100px' : '150px',
              marginBottom: '2rem'
            }}
          >
            <Image 
              src={loka.imgSrc} 
              alt={`${loka.name} symbol`} 
              fill
              style={{ objectFit: 'contain' }}
            />
          </motion.div>
        )}
        
        <motion.h1
          variants={itemVariants}
          style={{
            color: textColor,
            fontSize: 'clamp(1.8rem, 5vw, 4rem)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginBottom: '1rem'
          }}
        >
          {loka.name}
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          style={{
            color: textColor,
            fontSize: 'clamp(0.9rem, 2vw, 1.5rem)',
            fontWeight: 300,
            opacity: 0.8,
            maxWidth: '60ch',
            textAlign: 'center',
            marginBottom: '1.5rem',
            padding: isMobile ? '0 0.5rem' : 0
          }}
        >
          {loka.description}
        </motion.p>
        
        {loka.mantra && (
          <motion.div
            variants={itemVariants}
            className="loka-mantra"
            style={{
              color: textColor,
              fontSize: 'clamp(0.8rem, 1.5vw, 1.2rem)',
              fontStyle: 'italic',
              opacity: 0.7,
              marginTop: '1rem',
              textAlign: 'center',
              maxWidth: '80ch'
            }}
          >
            "{loka.mantra}"
          </motion.div>
        )}
        
        {loka.symbol && (
          <motion.div
            variants={itemVariants}
            className="loka-symbol"
            style={{
              color: textColor,
              fontSize: '2rem',
              opacity: 0.7,
              marginTop: '1.5rem'
            }}
          >
            {loka.symbol}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}