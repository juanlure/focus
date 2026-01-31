"use client";

import { useFocusStore } from "@/store/useFocusStore";
import { CapsuleCard } from "@/components/capsule/CapsuleCard";
import { Header } from "@/components/ui/Header";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { use } from "react";

export default function CapsulePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const capsule = useFocusStore(state => state.getCapsule(id));
    const router = useRouter();

    if (!capsule) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-muted-foreground">
                <p>Cápsula no encontrada o expirada.</p>
                <button onClick={() => router.push('/')} className="mt-4 text-primary underline">Volver al inicio</button>
            </div>
        );
    }

    return (
        <main className="flex-1 flex flex-col bg-background pb-24">
            <Header />
            <div className="p-4 space-y-4">
                <button onClick={() => router.back()} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Volver
                </button>

                <h2 className="text-xl font-bold px-1">Tu Cápsula de Acción</h2>
                <CapsuleCard capsule={capsule} />

                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-sm text-muted-foreground mt-6">
                    <h4 className="font-semibold mb-2 text-foreground">Status de IA</h4>
                    <p>Contenido analizado y condensado para máxima eficiencia. Sentiment detectado: {capsule.sentiment}.</p>
                </div>
            </div>
        </main>
    );
}
