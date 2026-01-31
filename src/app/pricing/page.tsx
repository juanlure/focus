"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background p-6 max-w-md mx-auto">
            <nav className="flex justify-between items-center mb-12">
                <Link href="/" className="font-bold text-xl">FocusBrief.</Link>
                <Link href="/" className="text-sm font-medium text-muted-foreground">Close</Link>
            </nav>

            <h1 className="text-4xl font-bold mb-4 text-center">Invierte en tu mente</h1>
            <p className="text-center text-muted-foreground mb-12">FocusBrief es una herramienta gratuita y 100% local.</p>

            <div className="space-y-6">
                {/* Free Plan */}
                <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-full tracking-wider">
                        Versión Actual
                    </div>
                    <h2 className="text-xl font-medium mb-2 text-primary">Cerebro Local</h2>
                    <div className="text-4xl font-bold mb-6">Gratis <span className="text-lg font-medium text-muted-foreground">para siempre</span></div>
                    <ul className="space-y-3 mb-8 text-sm">
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Cápsulas <strong>Ilimitadas</strong></li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Procesamiento Local Privado</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Sin suscripciones</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Tus datos nunca salen del navegador</li>
                    </ul>
                    <Link href="/onboarding">
                        <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors shadow-lg shadow-primary/25">
                            Empezar ahora
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
