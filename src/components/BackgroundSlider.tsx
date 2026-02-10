"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const backgrounds = [
    '/backgrounds/image1.jpeg',
    '/backgrounds/image2.jpeg',
    '/backgrounds/image3.jpeg',
    '/backgrounds/image4.jpeg',
    '/backgrounds/image5.jpeg',
    '/backgrounds/image6.jpeg',
    '/backgrounds/image7.jpeg',
    '/backgrounds/image8.jpeg',
];

export default function BackgroundSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % backgrounds.length);
        }, 8000); // Change every 8 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <AnimatePresence mode='popLayout'>
                <motion.img
                    key={currentIndex}
                    src={backgrounds[currentIndex]}
                    alt="Spiritual Background"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
        </div>
    );
}
