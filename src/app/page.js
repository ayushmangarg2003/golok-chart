"use client"

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GolokSvgChart from '../components/GolokSvgChart';
import LokaSection from '../components/LokaSection';
import NavDots from '../components/NavDots';
import { lokasData } from '../data/lokas';

export default function Home() {
  const [selectedRealm, setSelectedRealm] = useState(null);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const lokaSectionRefs = useRef({});
  const introRef = useRef(null);

  // Initialize refs and handle loading state
  useEffect(() => {
    lokasData.forEach(loka => {
      lokaSectionRefs.current[loka.id] = lokaSectionRefs.current[loka.id] || { current: null };
    });
    
    // Simulate loading content
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle scroll events to update selected realm
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Check if we're in the intro section
      if (introRef.current) {
        const introRect = introRef.current.getBoundingClientRect();
        if (introRect.top <= window.innerHeight / 2 && introRect.bottom >= window.innerHeight / 2) {
          setIsIntroVisible(true);
          setSelectedRealm(null);
          return;
        } else {
          setIsIntroVisible(false);
        }
      }
      
      // Check which loka section is currently in view
      for (const loka of lokasData) {
        const element = lokaSectionRefs.current[loka.id]?.current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setSelectedRealm(loka.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRealmSelect = (realmId) => {
    if (realmId === null) {
      // Scroll to intro
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    setSelectedRealm(realmId);
    
    // Scroll to the selected realm section
    if (lokaSectionRefs.current[realmId]?.current) {
      lokaSectionRefs.current[realmId].current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative w-16 h-16 mx-auto mb-4">
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-1 rounded-full bg-gray-900" />
          </div>
          <h2 className="text-white text-xl font-medium">Exploring the Cosmic Realms</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="relative scroll-smooth bg-gray-900 text-white">
      {/* Background elements */}
      <div className="fixed inset-0 bg-black opacity-50 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/30 via-transparent to-purple-900/30" />
        <div className="absolute inset-0 bg-[url('/stars-bg.png')] bg-repeat opacity-30" />
      </div>
      
      {/* Navigation dots */}
      <NavDots 
        lokasData={lokasData} 
        selectedRealm={selectedRealm} 
        onRealmSelect={handleRealmSelect}
        isIntroVisible={isIntroVisible}
      />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-gray-900 to-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Golok
            </span>
          </motion.div>
          
          <motion.nav 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="hidden md:block"
          >
            <ul className="flex space-x-6">
              {lokasData.map((loka) => (
                <li key={loka.id}>
                  <button 
                    onClick={() => handleRealmSelect(loka.id)}
                    className={`text-sm transition-all duration-300 px-2 py-1 rounded ${
                      selectedRealm === loka.id ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
                    }`}
                    style={{ 
                      textShadow: selectedRealm === loka.id ? `0 0 10px ${loka.color}` : 'none',
                      borderBottom: selectedRealm === loka.id ? `2px solid ${loka.color}` : 'none'
                    }}
                  >
                    {loka.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </header>
      
      {/* Intro section with the SVG chart */}
      <section 
        ref={introRef}
        className="h-screen w-full snap-start flex flex-col items-center justify-center relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600 opacity-10 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blue-600 opacity-10 blur-3xl" />
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 flex flex-col items-center justify-center"
        >
          {/* SVG Chart */}
          <motion.div 
            variants={itemVariants}
            className="w-full mb-8"
          >
            <GolokSvgChart onRealmSelect={handleRealmSelect} />
          </motion.div>
          
          {/* Title and description */}
          <div className="text-center px-4 mt-8">
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-white to-blue-400"
            >
              The Golok Chart
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Explore the sacred realms of Hindu cosmology and understand their divine significance in the cosmic hierarchy
            </motion.p>
            
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => handleRealmSelect(lokasData[0].id)}
            >
              Begin Journey
            </motion.button>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-0 right-0 flex justify-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 7L12 12L17 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </motion.div>
      </section>
      
      {/* Individual loka sections */}
      <AnimatePresence>
        {lokasData.map((loka) => (
          <motion.div
            key={loka.id}
            ref={el => lokaSectionRefs.current[loka.id] = { current: el }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <LokaSection
              {...loka}
              isActive={selectedRealm === loka.id}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-t from-gray-900 to-transparent text-center">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} The Golok Chart • A journey through Hindu cosmology
          </p>
        </div>
      </footer>
    </main>
  );
}