"use client";

import React from 'react';
import { Flame } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { motion } from 'framer-motion';

export default function StreakCounter() {
    const { profile } = useUser();

    if (!profile.isOnboarded || profile.streak === 0) return null;

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute top-6 right-6 z-40 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-orange-200/50 flex items-center gap-2 group cursor-help"
            title="Your Spiritual Streak: Consecutive days of practice"
        >
            <div className="relative">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500 group-hover:animate-pulse" />
                <div className="absolute inset-0 bg-orange-400 blur-sm opacity-50 rounded-full animate-pulse" />
            </div>
            <span className="font-bold text-gray-800 dark:text-gray-100 font-mono text-sm">
                {profile.streak} Day{profile.streak !== 1 && 's'}
            </span>
        </motion.div>
    );
}
