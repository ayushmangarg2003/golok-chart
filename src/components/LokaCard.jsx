"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LokaCard({ 
  title, 
  description, 
  image, 
  stories, 
  mantras, 
  practices,
  deities,
  symbolism 
}) {
  const [activeTab, setActiveTab] = useState('about');
  
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'stories', label: 'Stories' },
    { id: 'practices', label: 'Practices' }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md mx-auto">
      <div 
        className="h-48 bg-cover bg-center" 
        style={{ backgroundImage: `url(/images/${image})` }}
      />
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        
        {/* Tab navigation */}
        <div className="flex border-b mb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`px-4 py-2 mr-2 ${
                activeTab === tab.id 
                  ? 'border-b-2 border-blue-500 text-blue-500' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Tab content */}
        <div className="min-h-32">
          {activeTab === 'about' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-3">
                <h4 className="font-semibold text-gray-900">Primary Deities:</h4>
                <p className="text-gray-700">{deities}</p>
              </div>
              
              <div className="mb-3">
                <h4 className="font-semibold text-gray-900">Symbolism:</h4>
                <p className="text-gray-700">{symbolism}</p>
              </div>
              
              {mantras && (
                <div className="mt-4">
                  <h4 className="font-semibold">Associated Mantras:</h4>
                  <p className="italic text-gray-700">{mantras}</p>
                </div>
              )}
            </motion.div>
          )}
          
          {activeTab === 'stories' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {stories ? (
                <div>
                  <h4 className="font-semibold mb-2">Sacred Stories:</h4>
                  <p className="text-gray-700">{stories}</p>
                </div>
              ) : (
                <p className="text-gray-500">No stories available for this realm.</p>
              )}
            </motion.div>
          )}
          
          {activeTab === 'practices' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {practices ? (
                <div>
                  <h4 className="font-semibold mb-2">Spiritual Practices:</h4>
                  <p className="text-gray-700">{practices}</p>
                </div>
              ) : (
                <p className="text-gray-500">No specific practices listed for this realm.</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}