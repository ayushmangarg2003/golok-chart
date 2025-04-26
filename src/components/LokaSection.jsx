"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LokaSection({
    id,
    name,
    description,
    deities,
    symbolism,
    color,
    stories,
    mantras,
    practices
}) {
    const [showDetails, setShowDetails] = useState(false);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );
        
        const section = document.getElementById(id);
        if (section) {
            observer.observe(section);
        }
        
        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, [id]);

    // Generate a darker version of the color for the background
    const getDarkerColor = (hexColor) => {
        // Convert hex to RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);

        // Get darker values
        const darkerR = Math.floor(r * 0.5).toString(16).padStart(2, '0');
        const darkerG = Math.floor(g * 0.5).toString(16).padStart(2, '0');
        const darkerB = Math.floor(b * 0.5).toString(16).padStart(2, '0');

        return `#${darkerR}${darkerG}${darkerB}`;
    };

    const darkerColor = getDarkerColor(color);

    return (
        <section
            id={id}
            className="h-screen w-full flex items-center justify-center relative overflow-hidden snap-start"
            style={{
                background: `radial-gradient(circle at center, ${color}40 0%, ${darkerColor} 70%, #111827 100%)`
            }}
        >
            {/* Decorative circles in the background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large concentric circles */}
                {[600, 400, 200].map((size, index) => (
                    <motion.div
                        key={`circle-${index}`}
                        className="absolute rounded-full"
                        style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            border: `2px solid ${color}`,
                            top: '50%',
                            left: '50%',
                            marginLeft: `-${size/2}px`,
                            marginTop: `-${size/2}px`,
                            opacity: 0.1 + (index * 0.1)
                        }}
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 1.5 - (index * 0.3), delay: index * 0.2 }}
                    />
                ))}

                {/* Small particle-like circles */}
                {Array.from({ length: 20 }).map((_, i) => {
                    const size = Math.random() * 6 + 2;
                    return (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full"
                            style={{
                                backgroundColor: color,
                                width: `${size}px`,
                                height: `${size}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                opacity: Math.random() * 0.5 + 0.2,
                            }}
                            animate={{
                                y: [0, Math.random() * 100 - 50],
                                x: [0, Math.random() * 100 - 50],
                                opacity: [Math.random() * 0.5 + 0.2, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        />
                    );
                })}
            </div>

            <div className="z-10 text-center p-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    {/* Main central circle representing the loka */}
                    <div className="relative mx-auto mb-8">
                        <motion.div
                            className="w-40 h-40 rounded-full mx-auto flex items-center justify-center shadow-lg"
                            style={{ 
                                backgroundColor: color,
                                boxShadow: `0 0 30px ${color}80` 
                            }}
                            initial={{ scale: 0 }}
                            animate={isInView ? { scale: 1 } : { scale: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                        >
                            <span className="text-4xl font-bold text-white opacity-90">{name.split(' ')[0]}</span>
                        </motion.div>

                        {/* Orbiting small circles */}
                        <motion.div
                            className="absolute w-full h-full top-0 left-0"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: 'center center' }}
                        >
                            <motion.div 
                                className="w-4 h-4 rounded-full absolute"
                                style={{ 
                                    backgroundColor: 'white', 
                                    top: '-10px', 
                                    left: 'calc(50% - 8px)',
                                    boxShadow: `0 0 10px ${color}` 
                                }}
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>

                        <motion.div
                            className="absolute w-full h-full top-0 left-0"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                            style={{ transformOrigin: 'center center' }}
                        >
                            <motion.div 
                                className="w-6 h-6 rounded-full absolute"
                                style={{ 
                                    backgroundColor: 'white', 
                                    bottom: '-5px', 
                                    left: 'calc(50% - 12px)', 
                                    opacity: 0.7,
                                    boxShadow: `0 0 10px ${color}`
                                }}
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </motion.div>
                    </div>

                    <motion.h2
                        className="text-5xl font-bold mb-6 text-white"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {name}
                    </motion.h2>

                    <motion.p
                        className="text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        {description}
                    </motion.p>
                </motion.div>

                <motion.button
                    className="px-6 py-3 bg-white text-gray-900 rounded-lg shadow-lg font-semibold transition-all duration-300 hover:bg-opacity-90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    onClick={() => setShowDetails(!showDetails)}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {showDetails ? "Hide Details" : "Learn More"}
                </motion.button>

                <AnimatePresence>
                    {showDetails && (
                        <motion.div
                            className="mt-12 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto shadow-xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {deities && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                                            Primary Deities
                                        </h3>
                                        <p className="text-white text-opacity-90">{deities}</p>
                                    </div>
                                )}

                                {symbolism && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                                            Symbolism
                                        </h3>
                                        <p className="text-white text-opacity-90">{symbolism}</p>
                                    </div>
                                )}

                                {mantras && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                                            Sacred Mantras
                                        </h3>
                                        <p className="text-white text-opacity-90 italic">{mantras}</p>
                                    </div>
                                )}

                                {stories && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                                            Stories
                                        </h3>
                                        <p className="text-white text-opacity-90">{stories}</p>
                                    </div>
                                )}
                                
                                {practices && (
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2 flex items-center">
                                            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: color }}></span>
                                            Practices
                                        </h3>
                                        <p className="text-white text-opacity-90">{practices}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}