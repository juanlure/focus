"use client";

import { useState, useEffect } from "react";
import { Play, Square, Loader2 } from "lucide-react";
import { useFocusStore } from "@/store/useFocusStore";

export function AudioBriefing() {
    const capsules = useFocusStore(state => state.capsules);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined" && "speechSynthesis" in window) {
            setIsSupported(true);
        }
    }, []);

    const handlePlay = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel();
            setIsPlaying(false);
            return;
        }

        const unreadCapsules = capsules.slice(0, 3); // Read top 3
        if (unreadCapsules.length === 0) {
            const utterance = new SpeechSynthesisUtterance("No tienes cápsulas pendientes. Buen trabajo.");
            utterance.lang = "es-ES";
            window.speechSynthesis.speak(utterance);
            return;
        }

        setIsPlaying(true);
        const textToRead = `Buenos días. Tienes ${unreadCapsules.length} cápsulas pendientes. Primera: ${unreadCapsules[0].summary}. Segunda: ${unreadCapsules[1]?.summary || "Fin del resumen."}.`;

        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = "es-ES";
        utterance.rate = 1.1;

        utterance.onend = () => setIsPlaying(false);

        window.speechSynthesis.speak(utterance);
    };

    if (!isSupported) return null;

    return (
        <button
            onClick={handlePlay}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors text-foreground ring-1 ring-border"
            title="Escuchar Resumen"
        >
            {isPlaying ? <Square className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
        </button>
    );
}
