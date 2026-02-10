"use client";

import React, { useState, useRef, useEffect } from 'react';
import scriptures from '@/data/scriptures.json';
import { Send, Sparkles, User, Bot, BookOpen, RefreshCw, Flame, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, Mentor } from '@/context/UserContext';

type Message = {
    role: 'user' | 'bot';
    content: string | any;
    timestamp: number;
};

const mentorConfig: Record<Mentor, { name: string; color: string; icon: any; greeting: (name: string) => string }> = {
    krishna: {
        name: 'Lord Krishna',
        color: 'text-blue-600 dark:text-blue-400',
        icon: Sparkles,
        greeting: (name) => `Radhe Radhe, ${name || 'seeker'}. I am here to guide you through the illusions of the mind. What weighs on your heart today?`
    },
    ram: {
        name: 'Lord Ram',
        color: 'text-yellow-600 dark:text-yellow-400',
        icon: Shield,
        greeting: (name) => `Jai Shri Ram, ${name || 'friend'}. The path of righteousness (Dharma) is deeply subtle. How may I assist you in walking it?`
    },
    hanuman: {
        name: 'Lord Hanuman',
        color: 'text-red-600 dark:text-red-400',
        icon: Flame, // Using Flame as a proxy for Hanuman's energy
        greeting: (name) => `Jai Bajrang Bali, ${name || 'warrior'}! immense strength lies within you. Tell me, what challenge must we overcome together?`
    },
    shiva: {
        name: 'Lord Shiva',
        color: 'text-purple-600 dark:text-purple-400',
        icon: Zap, // Using Zap for Shiva's power
        greeting: (name) => `Om Namah Shivaya, ${name || 'ascetic'}. The world is a dance of creation and destruction. What truth do you seek?`
    }
};

export default function ChatInterface() {
    const { profile } = useUser();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const activeMentor = mentorConfig[profile.mentor] || mentorConfig.krishna;

    // Initialize greeting when profile loads
    useEffect(() => {
        if (profile.isOnboarded && messages.length === 0) {
            setMessages([{
                role: 'bot',
                content: activeMentor.greeting(profile.name),
                timestamp: Date.now()
            }]);
        } else if (!profile.isOnboarded && messages.length === 0) {
            // Default greeting if not onboarded yet
            setMessages([{
                role: 'bot',
                content: mentorConfig.krishna.greeting(''),
                timestamp: Date.now()
            }]);
        }
    }, [profile.isOnboarded, profile.mentor, profile.name, messages.length]); // Re-run if mentor changes

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        const userMsgObj: Message = { role: 'user', content: userMessage, timestamp: Date.now() };

        setMessages(prev => [...prev, userMsgObj]);
        setInput('');
        setIsTyping(true);

        // Simulate "Deep Thought" processing time
        const processingTime = Math.min(Math.max(userMessage.length * 20, 1000), 2500);

        setTimeout(() => {
            const response = generateResponse(userMessage);
            setMessages(prev => [...prev, { role: 'bot', content: response, timestamp: Date.now() }]);
            setIsTyping(false);
        }, processingTime);
    };

    const generateResponse = (query: string) => {
        const cleanQuery = query.toLowerCase().replace(/[^\w\s]/gi, ' ');
        const tokens = cleanQuery.split(/\s+/).filter(t => t.length > 0);

        let bestMatch = null;
        let maxScore = 0;

        scriptures.forEach(item => {
            let score = 0;
            item.keywords.forEach(keyword => {
                const lowerKeyword = keyword.toLowerCase();
                // strict match: token equals keyword
                if (tokens.includes(lowerKeyword)) {
                    score += 10;
                }
                // phrase match: query contains the keyword phrase with spaces
                else if (cleanQuery.includes(` ${lowerKeyword} `) || cleanQuery.startsWith(`${lowerKeyword} `) || cleanQuery.endsWith(` ${lowerKeyword}`)) {
                    score += 15;
                }
            });

            if (score > maxScore) {
                maxScore = score;
                bestMatch = item;
            }
        });

        // Threshold of 5 ensures at least one weak match or partial strong match
        if (bestMatch && maxScore >= 5) {
            return bestMatch;
        } else {
            // Context-aware fallbacks based on Mentor
            if (query.length < 5) return {
                role: 'bot',
                content: profile.mentor === 'hanuman'
                    ? "Speak up, warrior! Your words are too quiet. Is it anger or fear?"
                    : "Your words are few. Pour your heart out—is it anger, sadness, or fear that grips you?",
                timestamp: Date.now()
            }.content;

            const fallbacks = [
                "I hear your voice, but the specific burden confuses me. Are you speaking of **Anger**, **Fear**, **Sadness**, or **Duty**? Be direct.",
                "The scriptures yield many answers, but I must know the question clearly. Do you feel **Lost**, **Envious**, or **Arrogant**? Guide me.",
                "My wisdom flows from understanding your core emotion. Is it **Lust** clouding your mind, or **Grief** weighing on your soul?",
                "I am here. If you are suffering, tell me: is it **Loneliness** or **Failure**? Name the shadow."
            ];
            return fallbacks[Math.floor(Math.random() * fallbacks.length)];
        }
    };

    const MentorIcon = activeMentor.icon;

    return (
        <div className="flex flex-col h-[650px] w-full max-w-4xl mx-auto bg-white/70 dark:bg-gray-900/60 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 dark:border-white/10 overflow-hidden ring-1 ring-white/50">

            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-orange-500/10 to-transparent border-b border-orange-200/50 dark:border-orange-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-white flex items-center justify-center shadow-lg border border-orange-200`}>
                        <MentorIcon className={`w-6 h-6 ${activeMentor.color}`} />
                    </div>
                    <div>
                        <h3 className={`font-bold text-lg ${activeMentor.color}`}>{activeMentor.name}</h3>
                        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">AI Spiritual Guide</p>
                    </div>
                </div>
                <button
                    onClick={() => setMessages([{ role: 'bot', content: activeMentor.greeting(profile.name), timestamp: Date.now() }])}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors text-gray-500"
                    title="Reset Conversation"
                >
                    <RefreshCw className="w-4 h-4" />
                </button>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
            >
                <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={msg.timestamp}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {msg.role === 'bot' && (
                                <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0 mt-2 border border-orange-200 dark:border-orange-800">
                                    <MentorIcon className={`w-5 h-5 ${activeMentor.color}`} />
                                </div>
                            )}

                            <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm ${msg.role === 'user'
                                ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-none shadow-orange-500/20'
                                : 'bg-white/80 dark:bg-gray-800/90 border border-white dark:border-gray-700 rounded-bl-none'
                                }`}>
                                {typeof msg.content === 'string' ? (
                                    <p className="leading-relaxed">{msg.content}</p>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 tracking-wider uppercase bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full w-fit">
                                            <BookOpen className="w-3 h-3" />
                                            {msg.content.source}
                                        </div>

                                        <div className="relative pl-4 border-l-4 border-orange-300 dark:border-orange-700/50">
                                            <p className="font-serif italic text-xl text-gray-800 dark:text-gray-100 leading-relaxed mb-2">
                                                &quot;{msg.content.verse}&quot;
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                — {msg.content.translation}
                                            </p>
                                        </div>

                                        <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                <span className="font-semibold text-orange-600 dark:text-orange-400">Insight: </span>
                                                {msg.content.guidance}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {msg.role === 'user' && (
                                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0 mt-2">
                                    <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2 p-2 ml-14"
                    >
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-75" />
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce delay-150" />
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-t border-white/20 dark:border-white/5">
                <div className="flex gap-3 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Share your feelings (e.g. I am anxious about my future...)"
                        className="flex-1 px-6 py-4 rounded-xl border-none bg-white dark:bg-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-800 dark:text-gray-100 placeholder-gray-400"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
