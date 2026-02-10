"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser, Mentor, UserProfile } from '@/context/UserContext';
import { User, Briefcase, Smile, Frown, Flame, Heart, Zap, Sparkles } from 'lucide-react';

export default function OnboardingModal() {
    const { profile, completeOnboarding } = useUser();
    const [step, setStep] = useState(1);
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserProfile['role']>('seeker');
    const [struggle, setStruggle] = useState<UserProfile['struggle']>('purpose');
    const [mentor, setMentor] = useState<Mentor>('krishna');

    if (profile.isOnboarded) return null;

    const nextStep = () => setStep(s => s + 1);

    const finish = () => {
        completeOnboarding(name, role, struggle, mentor);
    };

    const variants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -20 }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-3xl shadow-2xl border border-orange-100 dark:border-gray-800 overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                {/* Progress Bar */}
                <div className="h-1 bg-gray-100 dark:bg-gray-800 w-full">
                    <div
                        className="h-full bg-orange-500 transition-all duration-500"
                        style={{ width: `${(step / 4) * 100}%` }}
                    />
                </div>

                <div className="p-8 min-h-[400px] flex flex-col justify-between">
                    <AnimatePresence mode='wait'>

                        {/* Step 1: Name */}
                        {step === 1 && (
                            <motion.div key="step1" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                                <div className="text-center space-y-2">
                                    <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                    <h2 className="text-3xl font-serif font-bold text-gray-800 dark:text-white">Welcome, Seeker.</h2>
                                    <p className="text-gray-500">I am here to guide you. What should I call you?</p>
                                </div>
                                <input
                                    autoFocus
                                    type="text"
                                    className="w-full text-center text-2xl border-b-2 border-orange-200 focus:border-orange-500 bg-transparent py-2 outline-none transition-colors"
                                    placeholder="Your Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && name.trim() && nextStep()}
                                />
                                <button
                                    onClick={nextStep}
                                    disabled={!name.trim()}
                                    className="w-full py-3 bg-orange-500 text-white rounded-xl font-medium disabled:opacity-50 hover:bg-orange-600 transition-colors"
                                >
                                    Continue
                                </button>
                            </motion.div>
                        )}

                        {/* Step 2: Role */}
                        {step === 2 && (
                            <motion.div key="step2" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-serif font-bold mb-6">Describe your current stage of life.</h2>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { id: 'student', label: 'Student', icon: Briefcase },
                                        { id: 'professional', label: 'Working Pro', icon: User },
                                        { id: 'seeker', label: 'Spiritual Seeker', icon: Sparkles },
                                        { id: 'homemaker', label: 'Homemaker', icon: Heart },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setRole(item.id as any); nextStep(); }}
                                            className="p-4 rounded-xl border-2 border-transparent hover:border-orange-400 bg-gray-50 dark:bg-gray-800 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all flex flex-col items-center gap-3 group"
                                        >
                                            <item.icon className="w-8 h-8 text-gray-400 group-hover:text-orange-500" />
                                            <span className="font-medium text-gray-700 dark:text-gray-200">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Struggle */}
                        {step === 3 && (
                            <motion.div key="step3" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-serif font-bold mb-2">What weighs on your heart?</h2>
                                    <p className="text-sm text-gray-500">I will prioritize wisdom for this struggle.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { id: 'stress', label: 'Stress & Anxiety', icon: Zap },
                                        { id: 'focus', label: 'Lack of Focus', icon: Briefcase },
                                        { id: 'anger', label: 'Anger Issues', icon: Flame },
                                        { id: 'loneliness', label: 'Loneliness', icon: Frown },
                                        { id: 'relationships', label: 'Relationships', icon: Heart },
                                        { id: 'purpose', label: 'Lost Purpose', icon: Sparkles },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => { setStruggle(item.id as any); nextStep(); }}
                                            className="p-3 text-left rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors flex items-center gap-3"
                                        >
                                            <item.icon className="w-5 h-5 text-orange-500" />
                                            <span className="font-medium text-sm">{item.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Mentor Selection */}
                        {step === 4 && (
                            <motion.div key="step4" variants={variants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                                <div className="text-center">
                                    <h2 className="text-2xl font-serif font-bold mb-2">Choose your Guide</h2>
                                    <p className="text-sm text-gray-500">Who resonates with your soul?</p>
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { id: 'krishna', label: 'Lord Krishna', desc: 'Philosophical, Playful, Profound', color: 'bg-blue-100 text-blue-800' },
                                        { id: 'ram', label: 'Lord Ram', desc: 'Righteous, Calm, Duty-bound', color: 'bg-yellow-100 text-yellow-800' },
                                        { id: 'hanuman', label: 'Lord Hanuman', desc: 'Devoted, Strong, Energetic', color: 'bg-red-100 text-red-800' },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setMentor(item.id as any)}
                                            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center justify-between ${mentor === item.id ? 'border-orange-500 bg-orange-50 dark:bg-gray-800' : 'border-transparent bg-gray-50 dark:bg-gray-800 hover:bg-gray-100'}`}
                                        >
                                            <div className="text-left">
                                                <h4 className="font-bold text-lg">{item.label}</h4>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border-2 border-gray-300 ${mentor === item.id ? 'bg-orange-500 border-orange-500' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={finish}
                                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Begin My Journey
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
