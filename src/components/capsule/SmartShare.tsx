"use client";

import { Share2, Image as ImageIcon, Check, Download, Brain } from "lucide-react";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toPng } from "html-to-image";
import { Capsule } from "@/lib/types";
import { toast } from "sonner";

export function SmartShare({ capsule }: { capsule: Capsule }) {
    const [isGenerating, setIsGenerating] = useState(false);
    const hiddenRef = useRef<HTMLDivElement>(null);

    const handleShare = async () => {
        if (!hiddenRef.current) return;

        setIsGenerating(true);
        try {
            // Give time for layout to settle if needed
            await new Promise(resolve => setTimeout(resolve, 100));

            const dataUrl = await toPng(hiddenRef.current, {
                quality: 0.95,
                pixelRatio: 2,
            });

            // Download trigger
            const link = document.createElement('a');
            link.download = `focus-capsule-${capsule.id.slice(0, 5)}.png`;
            link.href = dataUrl;
            link.click();

            toast.success("¡Imagen generada!", {
                description: "La cápsula ha sido exportada con éxito.",
                icon: <ImageIcon className="w-4 h-4" />
            });
        } catch (error) {
            console.error("Export Error:", error);
            toast.error("Error al exportar imagen");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <>
            <button
                onClick={handleShare}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-500 hover:bg-pink-500/20 transition-colors text-xs font-bold"
                title="Explora como Imagen"
            >
                {isGenerating ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                        <Share2 className="w-3 h-3" />
                    </motion.div>
                ) : (
                    <>
                        <ImageIcon className="w-3 h-3" /> Compartir
                    </>
                )}
            </button>

            {/* Hidden High-Quality Card for Export */}
            <div className="fixed -left-[2000px] top-0 pointer-events-none">
                <div
                    ref={hiddenRef}
                    className="w-[800px] h-[450px] bg-[#050505] p-12 flex flex-col justify-between border-4 border-white/5 relative overflow-hidden"
                >
                    {/* Background Noise/Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-pink-500/10 opacity-30" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px]" />

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/10 rounded-2xl">
                                <Brain className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black tracking-tighter text-white">FocusBrief</h1>
                                <p className="text-xs text-muted-foreground uppercase tracking-[0.3em]">Cápsula de Inteligencia</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <blockquote className="text-4xl font-bold leading-tight text-white border-l-8 border-primary pl-8 py-2">
                                {capsule.summary}
                            </blockquote>
                        </div>
                    </div>

                    <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-8">
                        <div className="space-y-1">
                            <p className="text-muted-foreground text-xs uppercase tracking-widest">Contenido Original</p>
                            <p className="text-white/40 text-sm max-w-[500px] line-clamp-1 italic">
                                "{capsule.originalContent.slice(0, 100)}..."
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest">
                                {capsule.sentiment}
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-2">focusbrief.app</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
