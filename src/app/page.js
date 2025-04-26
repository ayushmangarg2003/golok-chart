'use client';

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const layers = [
    { name: 'Goloka Vrindavan', description: 'The highest realm, home of Radha and Krishna.' },
    { name: 'Vaikuntha', description: 'The eternal abode of Lord Vishnu.' },
    { name: 'Brahmajyoti', description: 'The effulgence of the spiritual worlds.' },
    { name: 'Material World', description: 'Our galaxy, including Earth, created by Brahma.' },
    { name: 'Lower Lokas', description: 'The netherworlds, including Patala and Rasatala.' },
    { name: 'Naraka', description: 'The hellish realms as described in the scriptures.' },
  ];

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="relative">
        <h1 className="text-4xl font-bold text-center my-10 text-white">Golok Chart</h1>
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            className="relative flex items-center justify-center w-full h-screen bg-gradient-to-b from-blue-400 to-indigo-600 text-white"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="text-center">
              <h2 className="text-3xl font-semibold mb-4">{layer.name}</h2>
              <p className="text-lg">{layer.description}</p>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <button className="bg-indigo-700 text-white py-2 px-4 rounded-md shadow-md hover:bg-indigo-800">
                Learn More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
