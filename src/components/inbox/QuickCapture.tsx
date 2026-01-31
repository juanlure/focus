"use client";

import { motion } from "framer-motion";
import { ArrowUp, Link, FileText, Mic, Loader2 } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { useFocusStore } from "@/store/useFocusStore";
import { useRouter } from "next/navigation";
import { Capsule } from "@/lib/types";

export function QuickCapture() {
    const [input, setInput] = useState("");
    const [type, setType] = useState<"text" | "url">("text");
    const [isProcessing, setIsProcessing] = useState(false);

    const addCapsule = useFocusStore((state) => state.addCapsule);
    const router = useRouter();

    const handleProcess = async () => {
        if (!input.trim()) return;

        setIsProcessing(true);

        // Simulate AI Latency
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newId = crypto.randomUUID();
        const mockCapsule: Capsule = {
            id: newId,
            originalContent: input,
            type: type === "url" ? "url" : "text",
            summary: "Estrategia de reducción de carga cognitiva mediante aplicaciones PWA.", // Mock for demo
            actions: [
                { id: "1", text: "Investigar frameworks de PWA modernos.", isCompleted: false },
                { id: "2", text: "Definir paleta de colores oscuros premium.", isCompleted: false },
                { id: "3", text: "Prototipar navegación por gestos.", isCompleted: true },
            ],
            sentiment: "insightful",
            createdAt: new Date().toISOString(),
            timeToRead: "45s"
        };

        // If input is short, just generic echo for demo variety
        if (input.length < 20) {
            mockCapsule.summary = "Nota rápida capturada.";
            mockCapsule.actions = [{ id: "1", text: "Revisar nota posteriormente.", isCompleted: false }];
            mockCapsule.sentiment = "casual";
        }

        addCapsule(mockCapsule);
        router.push(`/capsule/${newId}`);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-background relative z-10">
            <div className="flex-1 flex flex-col p-6 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mb-2"
                >
                    <span className="text-muted-foreground text-sm font-medium">Modo de captura:</span>
                    <div className="flex max-w-fit bg-muted p-1 rounded-full border border-border">
                        <button
                            onClick={() => setType("text")}
                            className={clsx("px-3 py-1 rounded-full text-xs font-bold transition-colors", type === "text" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
                        >
                            Texto
                        </button>
                        <button
                            onClick={() => setType("url")}
                            className={clsx("px-3 py-1 rounded-full text-xs font-bold transition-colors", type === "url" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}
                        >
                            Enlace
                        </button>
                    </div>
                </motion.div>

                <motion.textarea
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 w-full bg-transparent text-lg placeholder:text-muted-foreground/50 resize-none focus:outline-none"
                    placeholder={type === "url" ? "Pega un enlace aquí..." : "¿Qué tienes en mente o qué acabas de recibir?"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus={!isProcessing}
                    disabled={isProcessing}
                />
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-background border-t border-border/40 pb-24"
            >
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-muted-foreground">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors"><Link className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-muted rounded-full transition-colors"><FileText className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-muted rounded-full transition-colors"><Mic className="w-5 h-5" /></button>
                    </div>

                    <button
                        onClick={handleProcess}
                        disabled={!input.trim() || isProcessing}
                        className="bg-accent text-accent-foreground px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isProcessing ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                Procesar
                                <ArrowUp className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
