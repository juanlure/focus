"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [name, setName] = useState("");
    const [role, setRole] = useState("");

    const nextStep = () => {
        if (step < 3) setStep(step + 1);
        else router.push("/dashboard");
    };

    return (
        <main className="min-h-screen bg-background flex flex-col p-6 max-w-md mx-auto relative overflow-hidden">
            {/* Progress Bar */}
            <div className="w-full h-1 bg-muted rounded-full mb-12">
                <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: "33%" }}
                    animate={{ width: `${step * 33.3}%` }}
                />
            </div>

            <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col justify-center"
            >
                {step === 1 && (
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold">Primero, ¿cómo te llamas?</h1>
                        <input
                            type="text"
                            placeholder="Escribe tu nombre..."
                            className="w-full bg-transparent border-b-2 border-white/20 text-2xl py-2 focus:outline-none focus:border-white transition-colors placeholder:text-muted-foreground/50"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold">¿Qué te define mejor?</h1>
                        <div className="grid gap-3">
                            {["Fundador / CEO", "Ingeniero de Software", "Creador de Contenido", "Estudiante"].map((r) => (
                                <button
                                    key={r}
                                    onClick={() => setRole(r)}
                                    className={`p-4 rounded-xl border text-left transition-all ${role === r ? 'bg-primary text-primary-foreground border-primary' : 'border-white/10 hover:bg-white/5'}`}
                                >
                                    <span className="font-medium">{r}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-6 text-center">
                        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold">Configuración Completada</h1>
                        <p className="text-muted-foreground">Hemos optimizado tu motor neural para flujos de <strong>{role}</strong>.</p>
                    </div>
                )}
            </motion.div>

            <button
                onClick={nextStep}
                className="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg mt-8 flex items-center justify-center gap-2"
            >
                {step === 3 ? "Lanzar Dashboard" : "Continuar"} <ArrowRight className="w-5 h-5" />
            </button>
        </main>
    );
}
