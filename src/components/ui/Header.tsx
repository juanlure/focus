"use client";

import { motion } from "framer-motion";
import { Zap, Settings as SettingsIcon } from "lucide-react";
import { AudioBriefing } from "./AudioBriefing";
import { StreakCounter } from "./StreakCounter";
import Link from "next/link";

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

                <Link href="/settings" className="p-2 -mr-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground">
                    <SettingsIcon className="w-5 h-5" />
                </Link>
            </div>
        </motion.header>
    );
}
