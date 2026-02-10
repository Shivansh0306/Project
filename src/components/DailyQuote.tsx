"use client";

import React, { useState, useEffect } from 'react';
import quotes from '@/data/quotes.json';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DailyQuote() {
    const [quote, setQuote] = useState<(typeof quotes)[0] | null>(null);

    useEffect(() => {
        // Simple logic to pick a quote based on the day of the year
        const today = new Date();
        const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
        const quoteIndex = dayOfYear % quotes.length;
        setQuote(quotes[quoteIndex]);
    }, []);

    if (!quote) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl max-w-2xl mx-auto my-8"
        >
            <div className="flex flex-col items-center text-center space-y-4">
                <Quote className="w-8 h-8 text-orange-400 rotate-180" />
                <p className="text-xl md:text-2xl font-serif text-gray-800 dark:text-gray-100 italic leading-relaxed">
                    &quot;{quote.text}&quot;
                </p>
                <div className="h-px w-20 bg-orange-400/50" />
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wider">
                    {quote.author}
                </p>
            </div>
        </motion.div>
    );
}
