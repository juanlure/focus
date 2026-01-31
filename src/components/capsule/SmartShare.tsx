"use client";

import { Share2, Image as ImageIcon, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function SmartShare() {
    const [isSharing, setIsSharing] = useState(false);
    const [isShared, setIsShared] = useState(false);

    const handleShare = () => {
        setIsSharing(true);
        setTimeout(() => {
            setIsSharing(false);
            setIsShared(true);
            setTimeout(() => setIsShared(false), 3000);
        }, 1500);
    };

    return (
        <button
            onClick={handleShare}
            disabled={isSharing}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 transition-colors text-xs font-bold"
            title="Generate Social Image"
        >
            {isSharing ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Share2 className="w-3 h-3" />
                </motion.div>
            ) : isShared ? (
                <>
                    <Check className="w-3 h-3" /> Image Saved
                </>
            ) : (
                <>
                    <ImageIcon className="w-3 h-3" /> Share
                </>
            )}
        </button>
    );
}
