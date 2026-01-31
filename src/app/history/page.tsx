"use client";

import { useFocusStore } from "@/store/useFocusStore";
import { CapsuleCard } from "@/components/capsule/CapsuleCard";
import { Header } from "@/components/ui/Header";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function HistoryPage() {
    const capsules = useFocusStore((state) => state.capsules);

    return (
        <main className="flex-1 flex flex-col bg-background pb-24">
            <Header />
            <div className="p-4 space-y-4">
                <h2 className="text-xl font-bold px-1 mb-4">Historial</h2>

                {capsules.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center opacity-50">
                            <Plus className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="font-semibold text-foreground">Nada por aquí aún</p>
                            <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                                Captura tu primer contenido para verlo aquí procesado.
                            </p>
                        </div>
                        <Link href="/capture" className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold">
                            Ir a Capturar
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4 overflow-hidden">
                        {capsules.map((capsule) => (
                            <SwipeToDelete key={capsule.id} id={capsule.id}>
                                <Link href={`/capsule/${capsule.id}`}>
                                    <CapsuleCard capsule={capsule} />
                                </Link>
                            </SwipeToDelete>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

function SwipeToDelete({ children, id }: { children: React.ReactNode, id: string }) {
    const removeCapsule = useFocusStore(state => state.removeCapsule);
    const [isRemoved, setIsRemoved] = useState(false);

    const handleDragEnd = (event: any, info: any) => {
        if (info.offset.x < -100) {
            setIsRemoved(true);
            setTimeout(() => removeCapsule(id), 200);
        }
    };

    if (isRemoved) return null;

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            className="relative touch-pan-y"
        >
            <div className="absolute top-0 bottom-0 right-0 w-24 bg-red-500/20 rounded-2xl flex items-center justify-end pr-6 -z-10">
                <span className="text-red-500 font-bold text-xs uppercase tracking-wider">Borrar</span>
            </div>
            <motion.div
                className="bg-background relative z-0"
                style={{ x: 0 }}
            >
                {children}
            </motion.div>
        </motion.div>
    )
}
