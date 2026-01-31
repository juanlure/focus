"use client";

import { Activity, BarChart3, Clock, Zap } from "lucide-react";

export function BrainStats() {
    return (
        <div className="grid grid-cols-2 gap-3 mt-4">
            <StatCard
                icon={<Zap className="w-4 h-4 text-yellow-500" />}
                label="Capsules"
                value="42"
                trend="+12%"
            />
            <StatCard
                icon={<Activity className="w-4 h-4 text-green-500" />}
                label="Action Rate"
                value="85%"
                trend="+5%"
            />
            <StatCard
                icon={<Clock className="w-4 h-4 text-blue-500" />}
                label="Focus Time"
                value="12h"
                trend="This Week"
            />
            <StatCard
                icon={<BarChart3 className="w-4 h-4 text-purple-500" />}
                label="Brain Score"
                value="92"
                trend="Top 10%"
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
