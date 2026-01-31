"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function StreamingText({ text, className }: { text: string, className?: string }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

    useEffect(() => {
        const controls = animate(count, text.length, {
            type: "tween",
            duration: Math.min(2, text.length * 0.02), // Dynamic duration based on length
            ease: "linear",
        });

        return controls.stop;
    }, [count, text]);

    return <motion.span className={className}>{displayText}</motion.span>;
}
