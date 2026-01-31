"use client";

import { Header } from "@/components/ui/Header";
import { Sliders, Cpu, Save } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SettingsPage() {
    const [tone, setTone] = useState("Concise");
    const [instructions, setInstructions] = useState("");
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2000);
    };

    return (
        <main className="flex-1 overflow-y-auto pb-24 relative bg-background">
            {/* Header with Back Button */}
            <header className="h-14 flex items-center px-4 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
                <Link href="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <span className="font-bold text-lg ml-2">Settings</span>
            </header>

            <div className="p-6 space-y-8">

                {/* Neural Engine Config */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold">Neural Engine</h2>
                    </div>

                    <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-6">

                        {/* Tone Selector */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">AI Personality:</label>
                            <div className="grid grid-cols-3 gap-2">
                                {["Concise", "Socratic", "Executive"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTone(t)}
                                        className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${tone === t ? "bg-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Instructions */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">Custom Instructions:</label>
                            <textarea
                                className="w-full h-32 bg-background/50 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground/30"
                                placeholder="e.g. Always summarize in bullet points. Use emojis. Avoid jargon..."
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                        >
                            {isSaved ? <span className="text-green-500">Changes Saved!</span> : <><Save className="w-4 h-4" /> Save Configuration</>}
                        </button>

                    </div>
                </section>

                {/* Developer API */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Sliders className="w-5 h-5 text-green-500" />
                        <h2 className="text-lg font-bold">Developer API</h2>
                    </div>
                    <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-bold">API Access</div>
                                <div className="text-xs text-muted-foreground">Read/Write access to your Second Brain.</div>
                            </div>
                            <button onClick={() => alert("API Key Generated: sk_live_51M...")} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                                Generate Key
                            </button>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg font-mono text-xs text-muted-foreground break-all">
                            sk_live_••••••••••••••••••••••
                        </div>
                    </div>
                </section>

                {/* Account Info */}
                <section className="space-y-4 opacity-50 pointer-events-none">
                    <div className="flex items-center gap-2 mb-2">
                        <Sliders className="w-5 h-5 text-muted-foreground" />
                        <h2 className="text-lg font-bold">Account</h2>
                    </div>
                    <div className="bg-card border border-border/50 rounded-2xl p-5">
                        <p className="text-sm">Manage subscription and profile...</p>
                    </div>
                </section>

            </div>
        </main>
    );
}
