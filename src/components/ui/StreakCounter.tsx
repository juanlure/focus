"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function StreakCounter() {
    return (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 font-bold text-sm cursor-help" title="12 Day Streak! Keep it up!">
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <Flame className="w-4 h-4 fill-orange-500" />
            </motion.div>
            <span>12</span>
        </div>
    );
}
