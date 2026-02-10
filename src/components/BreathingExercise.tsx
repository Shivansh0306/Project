"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wind } from 'lucide-react';

export default function BreathingExercise() {
    const [isActive, setIsActive] = useState(false);
    const [text, setText] = useState("Ready?");
    const [scale, setScale] = useState(1);

    useEffect(() => {
        if (!isActive) {
            setText("Ready?");
            setScale(1);
            return;
        }

        const breathe = () => {
            setText("Inhale...");
            setScale(1.5);
            setTimeout(() => {
                setText("Hold...");
                setTimeout(() => {
                    setText("Exhale...");
                    setScale(1);
                }, 2000); // Hold for 2s (simplified 4-7-8 for UI demo)
            }, 4000); // Inhale for 4s
        };

        breathe();
        const interval = setInterval(breathe, 10000); // 4 + 2 + 4 = 10s cycle (simplified)

        return () => clearInterval(interval);
    }, [isActive]);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/10 text-white dark:bg-gray-900/10 rounded-3xl border border-white/20 backdrop-blur-md">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <Wind className="w-5 h-5" />
                Breathing Space
            </h3>

            <div className="relative flex items-center justify-center mb-8">
                <motion.div
                    animate={{ scale: scale }}
                    transition={{ duration: isActive ? 4 : 0.5, ease: "easeInOut" }}
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-orange-300 to-yellow-300 blur-xl opacity-30 absolute"
                />
                <motion.div
                    animate={{ scale: scale }}
                    transition={{ duration: isActive ? 4 : 0.5, ease: "easeInOut" }}
                    className="w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm shadow-2xl flex items-center justify-center relative z-10 border-4 border-white/30"
                >
                    <span className="text-lg font-medium text-white">{text}</span>
                </motion.div>
            </div>

            <button
                onClick={() => setIsActive(!isActive)}
                className={`px-8 py-2 rounded-full font-medium transition-colors ${isActive
                        ? 'bg-red-500/80 text-white hover:bg-red-600/80'
                        : 'bg-white text-orange-600 hover:bg-orange-50 shadow-lg shadow-orange-900/20'
                    }`}
            >
                {isActive ? 'End Session' : 'Start Meditation'}
            </button>
        </div>
    );
}
