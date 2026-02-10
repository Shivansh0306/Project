"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Mentor = 'krishna' | 'ram' | 'hanuman' | 'shiva';

export type UserProfile = {
    name: string;
    role: 'student' | 'professional' | 'seeker' | 'homemaker';
    struggle: 'stress' | 'anger' | 'focus' | 'loneliness' | 'purpose' | 'relationships';
    mentor: Mentor;
    streak: number;
    lastVisit: string; // ISO date string
    isOnboarded: boolean;
};

const defaultProfile: UserProfile = {
    name: '',
    role: 'seeker',
    struggle: 'purpose',
    mentor: 'krishna',
    streak: 0,
    lastVisit: '',
    isOnboarded: false,
};

type UserContextType = {
    profile: UserProfile;
    updateProfile: (updates: Partial<UserProfile>) => void;
    completeOnboarding: (name: string, role: UserProfile['role'], struggle: UserProfile['struggle'], mentor: Mentor) => void;
    resetProgress: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState<UserProfile>(defaultProfile);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('dharma_profile');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);

                // Streak Logic
                const today = new Date().toISOString().split('T')[0];
                const lastVisit = parsed.lastVisit?.split('T')[0];

                let newStreak = parsed.streak || 0;

                if (lastVisit !== today) {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayString = yesterday.toISOString().split('T')[0];

                    if (lastVisit === yesterdayString) {
                        newStreak += 1;
                    } else if (!lastVisit) {
                        newStreak = 1;
                    } else {
                        newStreak = 1; // Reset streak if missed a day
                    }
                }

                setProfile({ ...parsed, streak: newStreak, lastVisit: new Date().toISOString() });
            } catch (e) {
                console.error("Failed to parse profile", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('dharma_profile', JSON.stringify(profile));
        }
    }, [profile, isLoaded]);

    const updateProfile = (updates: Partial<UserProfile>) => {
        setProfile(prev => ({ ...prev, ...updates }));
    };

    const completeOnboarding = (name: string, role: UserProfile['role'], struggle: UserProfile['struggle'], mentor: Mentor) => {
        setProfile(prev => ({
            ...prev,
            name,
            role,
            struggle,
            mentor,
            isOnboarded: true,
            streak: 1,
            lastVisit: new Date().toISOString()
        }));
    };

    const resetProgress = () => {
        setProfile(defaultProfile);
        localStorage.removeItem('dharma_profile');
    };

    return (
        <UserContext.Provider value={{ profile, updateProfile, completeOnboarding, resetProgress }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
