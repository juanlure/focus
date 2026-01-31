"use client";

import { useEffect, useState } from "react";
import { Share, PlusSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function IOSInstallGuide() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if it's iOS and not already in standalone mode
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        const isStandalone = (window.navigator as any).standalone === true;

        // For demo purposes, we also allow showing if it's not iOS but we are in dev
        if (isIOS && !isStandalone) {
            const dismissed = localStorage.getItem("ios-install-dismissed");
            if (!dismissed) {
                setShow(true);
            }
        }
    }, []);

    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-24 left-4 right-4 z-[60] bg-card border border-primary/20 rounded-2xl p-5 shadow-2xl overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <button
                    onClick={() => {
                        setShow(false);
                        localStorage.setItem("ios-install-dismissed", "true");
                    }}
                    className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <PlusSquare className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Añadir a Inicio</h4>
                            <p className="text-[10px] text-muted-foreground italic">Instala FocusBrief para la mejor experiencia.</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-3 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">1</span>
                            <p className="text-xs">Pulsa el botón <strong>Compartir</strong> <Share className="w-3 h-3 inline pb-0.5" /> en Safari.</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">2</span>
                            <p className="text-xs">Selecciona <strong>"Añadir a la pantalla de inicio"</strong>.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                    <span className="text-[10px] uppercase tracking-widest text-primary/50 font-bold">Recommended for iPhone</span>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
