"use client";

import React, { useState } from 'react';
import musicData from '@/data/music.json';
import { Music, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicPlayer() {
    const [selectedMood, setSelectedMood] = useState<string | null>(null);
    const [currentTrack, setCurrentTrack] = useState<(typeof musicData)[0] | null>(null);

    const moods = Array.from(new Set(musicData.map(item => item.mood)));

    const handleMoodSelect = (mood: string) => {
        setSelectedMood(mood);
        const track = musicData.find(item => item.mood === mood);
        setCurrentTrack(track || null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white flex items-center justify-center gap-2">
                <Music className="w-6 h-6 text-orange-500" />
                Divine Tunes
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
                {moods.map((mood) => (
                    <button
                        key={mood}
                        onClick={() => handleMoodSelect(mood)}
                        className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium
              ${selectedMood === mood
                                ? 'bg-orange-500 text-white shadow-lg scale-105'
                                : 'bg-white/50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-gray-700'
                            }`}
                    >
                        {mood}
                    </button>
                ))}
            </div>

            <AnimatePresence mode='wait'>
                {currentTrack && (
                    <motion.div
                        key={currentTrack.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-black"
                    >
                        <iframe
                            src={`${currentTrack.url}?autoplay=1`}
                            title={currentTrack.title}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {!currentTrack && (
                <div className="text-center text-gray-500 py-12 bg-white/30 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p>Select a mood to begin your spiritual journey</p>
                </div>
            )}
        </div>
    );
}
