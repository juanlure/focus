"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, FileText, CheckCircle2, Loader2, ChevronDown, ChevronUp } from "lucide-react";

const steps = [
    { text: "Analysing sub-topics...", icon: Search },
    { text: "Cross-referencing market data...", icon: GlobeIcon },
    { text: "Synthesizing competitor strategies...", icon: FileText },
    { text: "Generating strategic report...", icon: Sparkles },
];

function GlobeIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
    )
}

export function DeepResearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [status, setStatus] = useState<"idle" | "running" | "complete">("idle");
    const [currentStep, setCurrentStep] = useState(0);

    const startResearch = () => {
        setIsOpen(true);
        setStatus("running");
        let step = 0;
        const interval = setInterval(() => {
            step++;
            if (step >= steps.length) {
                clearInterval(interval);
                setStatus("complete");
            } else {
                setCurrentStep(step);
            }
        }, 1500);
    };

    return (
        <div className="mt-6 border-t border-border/40 pt-6">
            {status === "idle" && (
                <button
                    onClick={startResearch}
                    className="w-full py-3 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl flex items-center justify-center gap-2 text-indigo-300 font-medium hover:bg-indigo-900/70 transition-all group"
                >
                    <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Deep Research (Agentic Mode)
                </button>
            )}

            {status === "running" && (
                <div className="bg-card/30 rounded-xl p-4 border border-border/30 space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium animate-pulse">
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        Agent Working...
                    </div>
                    <div className="space-y-2">
                        {steps.map((s, idx) => (
                            <div key={idx} className={`flex items-center gap-3 text-xs ${idx === currentStep ? "text-foreground" : idx < currentStep ? "text-green-500" : "text-muted-foreground"}`}>
                                {idx < currentStep ? <CheckCircle2 className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                                {s.text}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {status === "complete" && (
                <div className="bg-card/30 rounded-xl border border-border/30 overflow-hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full p-4 flex items-center justify-between bg-primary/10 hover:bg-primary/20 transition-colors"
                    >
                        <div className="flex items-center gap-2 font-bold text-primary">
                            <CheckCircle2 className="w-5 h-5" />
                            Deep Analysis Ready
                        </div>
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: "auto" }}
                                exit={{ height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-4 space-y-4 text-sm text-foreground/80">
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Market Context</h4>
                                        <p>Based on current trends, this topic has seen a 40% increase in search volume in Q4 2025.</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground mb-1">Strategic Implication</h4>
                                        <p>Immediate action is recommended to capitalize on the "productivity gap". See connected nodes for more.</p>
                                    </div>
                                    <div className="p-3 bg-muted/30 rounded-lg text-xs font-mono">
                                        Source Confidence: 98.4%
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
