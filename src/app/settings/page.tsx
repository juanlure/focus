"use client";

import { Header } from "@/components/ui/Header";
import { Sliders, Cpu, Save } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useFocusStore } from "@/store/useFocusStore";

export default function SettingsPage() {
    const { googleAiKey, setGoogleAiKey } = useFocusStore();
    const [tone, setTone] = useState("Conciso");
    const [instructions, setInstructions] = useState("");
    const [userKey, setUserKey] = useState(googleAiKey);
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setGoogleAiKey(userKey);
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
                <span className="font-bold text-lg ml-2">Configuración</span>
            </header>

            <div className="p-6 space-y-8">

                {/* Configuración del Motor Neural */}
                <section className="space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold">Motor Neural</h2>
                    </div>

                    <div className="bg-card border border-border/50 rounded-2xl p-5 space-y-6">

                        {/* Selector de Tono */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">Personalidad de la IA:</label>
                            <div className="grid grid-cols-3 gap-2">
                                {["Conciso", "Socrático", "Ejecutivo"].map((t) => (
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

                        {/* API Key del Usuario */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">Tu Google AI API Key:</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    className="w-full bg-background/50 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/30"
                                    placeholder="sk-..."
                                    value={userKey}
                                    onChange={(e) => setUserKey(e.target.value)}
                                />
                                <div className="mt-1 text-[10px] text-muted-foreground">
                                    Consíguela gratis en <a href="https://aistudio.google.com/" target="_blank" className="underline text-primary">Google AI Studio</a>
                                </div>
                            </div>
                        </div>

                        {/* Instrucciones Personalizadas */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-muted-foreground">Instrucciones Personalizadas:</label>
                            <textarea
                                className="w-full h-32 bg-background/50 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-muted-foreground/30"
                                placeholder="ej. Resume siempre en puntos. Usa emojis. Evita tecnicismos..."
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleSave}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-[0.98]"
                        >
                            {isSaved ? <span className="text-primary-foreground/80">¡Configuración Guardada!</span> : <><Save className="w-4 h-4" /> Guardar Todo</>}
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
                                <div className="text-sm font-bold">Acceso API</div>
                                <div className="text-xs text-muted-foreground">Acceso de lectura/escritura a tu Segundo Cerebro.</div>
                            </div>
                            <button onClick={() => alert("sk_live_51M...")} className="text-xs font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                                Generar Key
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
