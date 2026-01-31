"use client";

import { useFocusStore } from "@/store/useFocusStore";
import { ReviewCard } from "@/components/capsule/ReviewCard";
import { Header } from "@/components/ui/Header";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ReviewPage() {
    const capsules = useFocusStore((state) => state.capsules);
    const archiveCapsule = useFocusStore((state) => state.archiveCapsule);
    const [stack, setStack] = useState(capsules.slice(0, 5)); // Take top 5 for perf
    const router = useRouter();

    // Sync state if capsules change externally, but simpler for this demo to just init once
    useEffect(() => {
        setStack(capsules.slice(0, 5));
    }, [capsules]);

    const handleSwipe = (id: string, direction: "left" | "right") => {
        if (direction === "left") {
            archiveCapsule(id);
        }
        // If right, we just keep it in store, but remove from local stack view for 'review' feeling

        setStack((prev) => prev.filter(c => c.id !== id));
    };

    return (
        <main className="flex-1 flex flex-col h-full bg-background overflow-hidden relative">
            <Header />

            <div className="flex-1 relative flex items-center justify-center p-4">
                <AnimatePresence>
                    {stack.length > 0 ? (
                        stack.map((capsule, index) => (
                            <div key={capsule.id} className="absolute inset-4 z-10" style={{ zIndex: stack.length - index }}>
                                <ReviewCard
                                    capsule={capsule}
                                    onSwipe={(dir) => handleSwipe(capsule.id, dir)}
                                />
                            </div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-4"
                        >
                            <div className="w-20 h-20 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCheck className="w-10 h-10" />
                            </div>
                            <h2 className="text-2xl font-bold">¡Todo Revisado!</h2>
                            <p className="text-muted-foreground max-w-[250px] mx-auto">
                                Has procesado tus cápsulas pendientes. Disfruta de tu claridad mental.
                            </p>
                            <div className="flex gap-4 justify-center mt-8">
                                <Link href="/" className="px-6 py-2 bg-muted text-foreground rounded-full font-medium text-sm">
                                    Inicio
                                </Link>
                                <button onClick={() => router.push('/capture')} className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium text-sm">
                                    Capturar más
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="h-20 flex items-center justify-center text-xs text-muted-foreground pb-6">
                {stack.length > 0 && "Desliza: Izquierda (Archivar) / Derecha (Mantener)"}
            </div>
        </main>
    );
}
