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
    const [recognition, setRecognition] = useState<any>(null);
    const router = useRouter();
    const { addCapsule } = useFocusStore();

    useEffect(() => {
        // Initialize Web Speech API
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const rec = new SpeechRecognition();
            rec.continuous = true;
            rec.interimResults = true;
            rec.lang = 'es-ES';

            rec.onresult = (event: any) => {
                let currentTranscript = "";
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    currentTranscript += event.results[i][0].transcript;
                }
                setTranscript(currentTranscript);
            };

            rec.onstart = () => setIsListening(true);
            rec.onend = () => setIsListening(false);
            rec.onerror = (event: any) => {
                console.error("Speech Recognition Error:", event.error);
                setIsListening(false);
            };

            setRecognition(rec);

            // Auto-start after delay
            const timer = setTimeout(() => rec.start(), 1000);
            return () => {
                clearTimeout(timer);
                rec.stop();
            };
        }
    }, []);

    const handleStop = () => {
        if (recognition) recognition.stop();
        setIsListening(false);

        if (!transcript.trim()) {
            router.push("/dashboard");
            return;
        }

        // Add to store (will be refined by the user or processed later)
        addCapsule({
            type: "text",
            summary: "Nota de Voz (Pendiente)",
            originalContent: transcript,
            actions: [
                { id: crypto.randomUUID(), text: "Procesar esta nota de voz con IA", isCompleted: false }
            ],
            sentiment: "reflective",
            timeToRead: "30s"
        });

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
                        Finalizar Sesión
                    </button>
                </div>

            </div>
        </main>
    );
}
