"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Wind } from "lucide-react";
import { useState, useEffect } from "react";

export function ZenModeOverlay({ actionText, isOpen, onClose }: { actionText: string, isOpen: boolean, onClose: () => void }) {
    const [breathingState, setBreathingState] = useState("inhale");

    useEffect(() => {
        if (!isOpen) return;
        const interval = setInterval(() => {
            setBreathingState(prev => prev === "inhale" ? "exhale" : "inhale");
        }, 4000);
        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white p-8"
                >
                    {/* Breathing Background */}
                    <motion.div
                        animate={{ scale: breathingState === "inhale" ? 1.2 : 1, opacity: breathingState === "inhale" ? 0.3 : 0.1 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black pointer-events-none"
                    />

                    <button onClick={onClose} className="absolute top-8 right-8 p-2 text-white/50 hover:text-white z-20">
                        <X className="w-8 h-8" />
                    </button>

                    <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                        <motion.div
                            animate={{ y: breathingState === "inhale" ? -20 : 0 }}
                            transition={{ duration: 4, ease: "easeInOut" }}
                            className="flex flex-col items-center gap-4"
                        >
                            <div className="p-4 bg-white/10 rounded-full backdrop-blur-md">
                                <Wind className="w-8 h-8 text-indigo-300" />
                            </div>
                            <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-indigo-300">Zen Focus</h3>
                        </motion.div>

                        <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-2xl font-serif">
                            {actionText}
                        </h1>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onClose}
                            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
                        >
                            <CheckCircle className="w-6 h-6" />
                            Completar & Salir
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
