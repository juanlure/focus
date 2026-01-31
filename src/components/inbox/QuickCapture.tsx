"use client";

import { motion } from "framer-motion";
import { ArrowUp, Link2, Zap, Loader2 } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { useFocusStore } from "@/store/useFocusStore";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Added import

export function QuickCapture() {
    const [input, setInput] = useState("");
    const [type, setType] = useState<"text" | "url">("text");
    const [isProcessing, setIsProcessing] = useState(false);

    const { addCapsule, googleAiKey } = useFocusStore();
    const router = useRouter();

    const handleProcess = async () => {
        if (!input.trim()) return;

        setIsProcessing(true);

        try {
            const response = await fetch("/api/capsule/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": googleAiKey // Pass user key if it exists
                },
                body: JSON.stringify({
                    content: input,
                    tone: "Executive",
                    customInstructions: ""
                }),
            });

            if (!response.ok) throw new Error("Failed to generate capsule");

            const aiResult = await response.json();

            const newId = crypto.randomUUID();
            addCapsule({
                id: newId,
                originalContent: input,
                type: type === "url" ? "url" : "text",
                summary: aiResult.summary,
                actions: aiResult.actions,
                sentiment: aiResult.sentiment,
                timeToRead: aiResult.timeToRead,
            });

            setInput("");
            router.push(`/capsule/${newId}`);
        } catch (error) {
            console.error("AI Capture Error:", error);
            // Fallback for demo or if no API key
            const mockId = crypto.randomUUID();
            addCapsule({
                id: mockId,
                originalContent: input,
                type: type === "url" ? "url" : "text",
                summary: "Nota capturada (Modo Offline o sin API Key)",
                actions: [{ id: "1", text: "Revisar y procesar manualmente", isCompleted: false }],
                sentiment: "casual",
                timeToRead: "15s"
            });
            router.push(`/capsule/${mockId}`);
        } finally {
            setIsProcessing(false);
        }
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
                    placeholder={type === "url" ? "Pega un enlace aquí..." : "¿Qué tienes en mente?"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus={!isProcessing}
                    disabled={isProcessing}
                />
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={type === "url" ? "Pega un enlace aquí..." : "¿En qué estás pensando?"}
                    className="w-full h-40 bg-transparent text-xl font-medium placeholder:text-muted-foreground/40 resize-none focus:outline-none"
                    autoFocus={!isProcessing}
                    disabled={isProcessing}
                />

                {!googleAiKey && !isProcessing && (
                    <div className="mb-4 p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-muted-foreground flex gap-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        Modo Offline / Inteligencia Simulada. <Link href="/settings" className="underline font-bold text-primary">Añade tu API Key</Link> para activar Gemini AI.
                    </div>
                )}
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-background border-t border-border/40 pb-24"
            >
                <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-muted-foreground">
                        <button className="p-2 hover:bg-muted rounded-full transition-colors"><Link2 className="w-5 h-5" /></button>
                        <button className="p-2 hover:bg-muted rounded-full transition-colors"><Zap className="w-5 h-5" /></button>
                    </div>

                    <button
                        onClick={handleProcess}
                        disabled={!input.trim() || isProcessing}
                        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
