"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { lokasData } from '../data/lokas';

export default function GolokSvgChart({ onRealmSelect }) {
  const [activeRealm, setActiveRealm] = useState(null);

  // Create positioning data for the SVG - horizontal layout
  const svgRealms = lokasData.map((realm, index) => ({
    ...realm,
    cx: 100 + index * 100,
    r: 36 - index * 2
  }));

  const handleRealmClick = (realmId) => {
    if (onRealmSelect) {
      onRealmSelect(realmId);
    }
  };

  return (
    <div className="w-full h-auto flex items-center justify-center bg-gray-900 p-4 overflow-hidden">
      <div className="relative w-full max-w-full">
        <svg 
          viewBox={`0 0 ${Math.max(900, 100 + svgRealms.length * 100)} 300`} 
          className="w-full h-auto max-h-screen"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="bg-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#111827" />
              <stop offset="100%" stopColor="#1f2937" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <rect x="0" y="0" width="100%" height="300" fill="url(#bg-gradient)" />

          {/* Central axis line */}
          <line x1="0" y1="150" x2="100%" y2="150" stroke="#4B5563" strokeWidth="2" strokeDasharray="5,5" />

          {/* Connecting lines between realms */}
          {svgRealms.map((realm, index) => {
            if (index < svgRealms.length - 1) {
              return (
                <line 
                  key={`connector-${realm.id}`}
                  x1={realm.cx} 
                  y1="150" 
                  x2={svgRealms[index + 1].cx} 
                  y2="150" 
                  stroke="#4B5563" 
                  strokeWidth="1" 
                  strokeDasharray="3,3" 
                />
              );
            }
            return null;
          })}

          {/* Realm circles */}
          {svgRealms.map((realm) => (
            <g key={realm.id}>
              <motion.circle
                cx={realm.cx}
                cy="150"
                r={realm.r}
                fill={realm.color}
                opacity={activeRealm === realm.id ? 0.9 : 0.6}
                stroke={activeRealm === realm.id ? "white" : realm.color}
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: svgRealms.indexOf(realm) * 0.1,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                onMouseEnter={() => setActiveRealm(realm.id)}
                onMouseLeave={() => setActiveRealm(null)}
                onClick={() => handleRealmClick(realm.id)}
                className="cursor-pointer"
                filter={activeRealm === realm.id ? "url(#glow)" : "none"}
              />

              <motion.text
                x={realm.cx}
                y="190"
                textAnchor="middle"
                alignmentBaseline="middle"
                fill="white"
                fontSize="12"
                fontWeight={activeRealm === realm.id ? "bold" : "normal"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: svgRealms.indexOf(realm) * 0.1 + 0.2 }}
              >
                {realm.name}
              </motion.text>
            </g>
          ))}
        </svg>

        {/* Information panel */}
        {activeRealm && (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 bottom-0 bg-gray-800 bg-opacity-90 p-4 rounded-lg text-white max-w-xs mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold mb-2" style={{ color: svgRealms.find(r => r.id === activeRealm)?.color }}>
              {svgRealms.find(r => r.id === activeRealm)?.name}
            </h3>
            <p className="mb-2 text-sm">
              {svgRealms.find(r => r.id === activeRealm)?.description}
            </p>
            <button
              className="text-sm text-blue-300 hover:underline"
              onClick={() => handleRealmClick(activeRealm)}
            >
              Explore this realm
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}