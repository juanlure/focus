import { Activity, BarChart3, Clock, Zap } from "lucide-react";
import { useFocusStore } from "@/store/useFocusStore";
import { useEffect, useState } from "react";

export function BrainStats() {
    const { capsules, archivedCapsules } = useFocusStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Avoid hydration mismatch
    if (!mounted) return <div className="grid grid-cols-2 gap-3 mt-4 h-48 animate-pulse bg-muted/20 rounded-2xl" />;

    const totalCapsules = capsules.length + archivedCapsules.length;
    const actionRate = totalCapsules > 0 ? Math.round((archivedCapsules.length / totalCapsules) * 100) : 0;

    return (
        <div className="grid grid-cols-2 gap-3 mt-4">
            <StatCard
                icon={<Zap className="w-4 h-4 text-yellow-500" />}
                label="Cápsulas"
                value={totalCapsules.toString()}
                trend={`${capsules.length} activas`}
            />
            <StatCard
                icon={<Activity className="w-4 h-4 text-green-500" />}
                label="Tasa Acción"
                value={`${actionRate}%`}
                trend="+0%"
            />
            <StatCard
                icon={<Clock className="w-4 h-4 text-blue-500" />}
                label="Tiempo Foco"
                value="--h"
                trend="Esta semana"
            />
            <StatCard
                icon={<BarChart3 className="w-4 h-4 text-purple-500" />}
                label="Nivel Neural"
                value={Math.min(100, (capsules.length * 5) + 50).toString()}
                trend="Lvl 1"
            />
        </div>
    );
}

function StatCard({ icon, label, value, trend }: { icon: any, label: string, value: string, trend: string }) {
    return (
        <div className="p-4 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-muted/50">{icon}</div>
                {trend.includes("%") ? (
                    <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded-full">{trend}</span>
                ) : (
                    <span className="text-[10px] font-medium text-muted-foreground">{trend}</span>
                )}
            </div>
            <div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-xs text-muted-foreground font-medium">{label}</div>
            </div>
        </div>
    )
}
