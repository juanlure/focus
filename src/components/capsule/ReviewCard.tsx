"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Capsule } from "@/lib/types";
import { Archive, CheckCircle } from "lucide-react";
import { useState } from "react";
import { SentimentBadge } from "./SentimentBadge";

export function ReviewCard({ capsule, onSwipe }: { capsule: Capsule, onSwipe: (direction: "left" | "right") => void }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

    // Visual cues opacity
    const archiveOpacity = useTransform(x, [-100, -20], [1, 0]);
    const keepOpacity = useTransform(x, [20, 100], [0, 1]);
    const bg = useTransform(x, [-200, 0, 200], ["rgba(239, 68, 68, 0.1)", "rgba(24, 24, 27, 0.6)", "rgba(34, 197, 94, 0.1)"]);

    const [exitX, setExitX] = useState(0);

    const handleDragEnd = (e: any, info: any) => {
        if (info.offset.x < -100) {
            setExitX(-500);
            onSwipe("left");
        } else if (info.offset.x > 100) {
            setExitX(500);
            onSwipe("right");
        }
    };

    return (
        <motion.div
            style={{ x: exitX !== 0 ? exitX : x, rotate, opacity, background: bg }}
            drag={exitX === 0 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            animate={exitX !== 0 ? { x: exitX, opacity: 0 } : {}}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-full h-[60vh] rounded-3xl p-6 border border-border/50 shadow-2xl flex flex-col justify-between backdrop-blur-xl touch-none cursor-grab active:cursor-grabbing origin-bottom"
        >
            <div className="space-y-4 pointer-events-none">
                <div className="flex justify-between items-center">
                    <SentimentBadge sentiment={capsule.sentiment} />
                </div>
                <h2 className="text-2xl font-bold leading-tight">{capsule.summary}</h2>
                <p className="text-sm text-muted-foreground line-clamp-4 italic border-l-2 border-primary/30 pl-3">
                    {capsule.originalContent}
                </p>
            </div>

            <div className="pointer-events-none">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><Archive className="w-3 h-3" /> Archivar</span>
                    <span className="flex items-center gap-1">Mantener <CheckCircle className="w-3 h-3" /></span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-foreground/20 mx-auto rounded-full" />
                </div>
            </div>

            {/* Overlay Cues */}
            <motion.div style={{ opacity: archiveOpacity }} className="absolute top-8 right-8 p-4 border-4 border-red-500 rounded-full text-red-500 font-bold text-xl uppercase -rotate-12 transform">
                Archivar
            </motion.div>
            <motion.div style={{ opacity: keepOpacity }} className="absolute top-8 left-8 p-4 border-4 border-green-500 rounded-full text-green-500 font-bold text-xl uppercase rotate-12 transform">
                Mantener
            </motion.div>

        </motion.div>
    );
}
