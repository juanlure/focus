"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mic, ArrowLeft, StopCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFocusStore } from "@/store/useFocusStore";

export default function VoiceCapturePage() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const router = useRouter();
    const { addCapsule } = useFocusStore();

    useEffect(() => {
        // Simulate initial start delay
        const timer = setTimeout(() => setIsListening(true), 800);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isListening) {
            // Simulate progressive transcription
            const phrases = [
                "FocusBrief...",
                " record this...",
                " I need to scale the platform...",
                " to 1 million users...",
                " by Q3."
            ];
            let delay = 0;
            phrases.forEach((phrase, index) => {
                setTimeout(() => {
                    setTranscript(prev => prev + phrase);
                }, delay + 1000);
                delay += 1500;
            });
        }
    }, [isListening]);

    const handleStop = () => {
        setIsListening(false);
        // Process content (simulated)
        addCapsule({
            type: "text",
            summary: "Scaling Strategy to 1M Users",
            originalContent: transcript || "Voice Note: Scaling strategy discussions...",
            actions: [
                { id: "v1", text: "Draft growth roadmap Q3", isCompleted: false },
                { id: "v2", text: "Hire VP of Engineering", isCompleted: false },
                { id: "v3", text: "Review infrastructure costs", isCompleted: false }
            ],
            sentiment: "insightful",
            timeToRead: "45s"
        });
        // Navigate to recent capsule view (simulated by going to history for now)
        router.push("/history");
    };

    return (
        <main className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Ripples */}
            {isListening && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                            className="absolute w-64 h-64 rounded-full border border-primary/20"
                        />
                    ))}
                </div>
            )}

            <div className="z-10 text-center space-y-12 w-full max-w-md px-6">

                <div className="space-y-4">
                    <motion.div
                        animate={{ scale: isListening ? [1, 1.1, 1] : 1 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-colors ${isListening ? 'bg-red-500/20 text-red-500 shadow-[0_0_50px_rgba(239,68,68,0.4)]' : 'bg-muted text-muted-foreground'}`}
                    >
                        <Mic className="w-10 h-10" />
                    </motion.div>

                    <div className="h-24 flex items-center justify-center">
                        <p className="text-2xl font-light text-white/90 leading-relaxed text-center">
                            "{transcript}<span className="animate-pulse">|</span>"
                        </p>
                    </div>
                </div>

                {/* Waveform Visualization (CSS Bars) */}
                <div className="flex items-center justify-center gap-1 h-12">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: isListening ? [10, Math.random() * 40 + 10, 10] : 4 }}
                            transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                            className="w-1 bg-white/80 rounded-full"
                        />
                    ))}
                </div>

                <div className="flex justify-center gap-6">
                    <Link href="/dashboard">
                        <button className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                    </Link>
                    <button
                        onClick={handleStop}
                        className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                        <StopCircle className="w-6 h-6 fill-red-500 text-red-500" />
                        End Session
                    </button>
                </div>

            </div>
        </main>
    );
}
