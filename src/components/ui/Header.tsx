"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { AudioBriefing } from "./AudioBriefing";
import { StreakCounter } from "./StreakCounter";

export function Header() {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-14 flex items-center justify-between px-4 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50"
        >
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-accent/10 rounded-lg">
                    <Zap className="w-5 h-5 text-accent" fill="currentColor" />
                </div>
                <span className="font-bold text-lg tracking-tight">FocusBrief</span>
            </div>

            <div className="flex items-center gap-3">
                <StreakCounter />
                <AudioBriefing />
                {/* Placeholder for future actions like user profile or connectivity status */}
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                    J
                </div>
            </div>
        </motion.header>
    );
}
