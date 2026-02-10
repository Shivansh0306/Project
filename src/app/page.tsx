import React from 'react';
import DailyQuote from '@/components/DailyQuote';
import ChatInterface from '@/components/ChatInterface';
import MusicPlayer from '@/components/MusicPlayer';
import BreathingExercise from '@/components/BreathingExercise';
import BackgroundSlider from '@/components/BackgroundSlider';
import OnboardingModal from '@/components/OnboardingModal';
import StreakCounter from '@/components/StreakCounter';

export default function Home() {
  return (
    <main className="min-h-screen spiritual-gradient overflow-x-hidden selection:bg-orange-200">
      <OnboardingModal />
      <StreakCounter />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Background with Parallax-like feel */}
        <BackgroundSlider />

        <div className="relative z-10 px-4 md:px-8 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-400 drop-shadow-2xl tracking-tighter">
            Meaningful Life
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
            "Your right is to perform your duty only, but never to its fruits."
          </p>
          <div className="pt-8">
            <DailyQuote />
          </div>

          <div className="flex justify-center gap-4 pt-8">
            <a href="#chat" className="px-8 py-3 bg-white text-orange-600 rounded-full font-bold hover:bg-orange-50 transition-colors shadow-xl">
              Start Chat
            </a>
            <a href="#music" className="px-8 py-3 bg-white/10 backdrop-blur-md text-white border border-white/30 rounded-full font-medium hover:bg-white/20 transition-colors">
              Listen Music
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 space-y-24">

        {/* Chat Section */}
        <section id="chat" className="scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Soul Solace</h2>
            <p className="text-white/80">Ask your life's questions and receive guidance from the Scriptures.</p>
          </div>
          <ChatInterface />
        </section>

        {/* Music Section */}
        <section id="music" className="scroll-mt-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-white/20">
          <MusicPlayer />
        </section>

        {/* Meditation Section */}
        <section id="breathe" className="scroll-mt-24 max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Breathe & Be</h2>
            <p className="text-white/80">Take a moment to center yourself.</p>
          </div>
          <BreathingExercise />
        </section>

      </div>

      {/* Footer */}
      <footer className="bg-black/20 text-white/60 py-8 text-center backdrop-blur-md">
        <p>&copy; {new Date().getFullYear()} Meaningful Life. Guided by Dharma.</p>
      </footer>
    </main>
  );
}
