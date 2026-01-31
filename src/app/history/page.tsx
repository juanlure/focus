"use client";

import { useFocusStore } from "@/store/useFocusStore";
import { CapsuleCard } from "@/components/capsule/CapsuleCard";
import { Header } from "@/components/ui/Header";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";

export default function HistoryPage() {
    const capsules = useFocusStore((state) => state.capsules);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<string>("all");

    const filteredCapsules = useMemo(() => {
        return capsules.filter(cap => {
            const matchesSearch = cap.summary.toLowerCase().includes(search.toLowerCase()) ||
                cap.originalContent.toLowerCase().includes(search.toLowerCase());
            const matchesFilter = filter === "all" || cap.sentiment === filter;
            return matchesSearch && matchesFilter;
        });
    }, [capsules, search, filter]);

    return (
        <main className="flex-1 flex flex-col bg-background pb-24">
            <Header />
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-xl font-bold">Historial</h2>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 py-0.5 rounded-full">{capsules.length} Cápsulas</span>
                </div>

                {/* Search & Filter UI */}
                <div className="space-y-3">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Buscar en tu cerebro..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-muted/40 border border-border/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-muted-foreground/40"
                        />
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {[
                            { value: "all", label: "Todos" },
                            { value: "urgent", label: "Urgente" },
                            { value: "insightful", label: "Ideas" },
                            { value: "action-required", label: "Tareas" }
                        ].map((btn) => (
                            <button
                                key={btn.value}
                                onClick={() => setFilter(btn.value)}
                                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${filter === btn.value ? "bg-primary text-primary-foreground border-primary" : "bg-muted/30 text-muted-foreground border-border/50 hover:bg-muted/50"}`}
                            >
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>

                {filteredCapsules.length === 0 ? (
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
                        {filteredCapsules.map((capsule) => (
                            <SwipeToDelete key={capsule.id} id={capsule.id}>
                                <Link href={`/capsule/${capsule.id}`}>
                                    <CapsuleCard capsule={capsule} />
                                </Link>
                            </SwipeToDelete>
                        ))}
                        {filteredCapsules.length === 0 && search && (
                            <div className="text-center py-10 text-muted-foreground text-sm">
                                No se encontraron resultados para "{search}"
                            </div>
                        )}
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
