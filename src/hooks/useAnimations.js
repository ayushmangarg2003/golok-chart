'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for handling animation-related functionality
 * @returns {Object} Animation-related state and utilities
 */
export function useAnimations() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Initial calls
    handleResize();
    handleScroll();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  /**
   * Gets appropriate animation speed based on device
   * @param {number} baseSpeed Base animation speed in seconds
   * @returns {number} Adjusted animation speed
   */
  const getAnimationSpeed = (baseSpeed = 1) => {
    if (isMobile) return baseSpeed * 0.8; // Slightly faster on mobile
    return baseSpeed;
  };
  
  /**
   * Calculate which section is currently most visible
   * @param {Array} sectionIds Array of section IDs to check
   * @returns {string|null} ID of most visible section or null
   */
  const getCurrentSection = (sectionIds) => {
    if (typeof window === 'undefined') return null;
    
    const sections = sectionIds.map(id => {
      const element = document.getElementById(id);
      if (!element) return { id, visibility: 0 };
      
      const rect = element.getBoundingClientRect();
      const total = rect.height;
      const visible = 
        rect.top > 0
          ? Math.min(rect.height, window.innerHeight - rect.top)
          : Math.min(window.innerHeight, rect.bottom);
      
      return {
        id,
        visibility: visible / total
      };
    });
    
    // Find section with highest visibility
    const currentSection = sections.reduce((max, section) => 
      section.visibility > max.visibility ? section : max, 
      { id: null, visibility: 0 }
    );
    
    return currentSection.id;
  };
  
  return {
    windowSize,
    isMobile,
    isTablet,
    scrollPosition,
    getAnimationSpeed,
    getCurrentSection,
  };
}