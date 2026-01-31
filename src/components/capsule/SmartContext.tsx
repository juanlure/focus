"use client";

import { Link2 } from "lucide-react";

export function SmartContext() {
    return (
        <div className="mt-8">
            <div className="flex items-center gap-2 mb-3 text-muted-foreground">
                <Link2 className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Brain Connections</h4>
            </div>

            <div className="space-y-2">
                <div className="p-3 rounded-lg bg-card/40 border border-border/30 hover:bg-card/60 transition-colors cursor-pointer flex justify-between items-center group">
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">Digital Minimalism Principles</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">84% Match</span>
                </div>
                <div className="p-3 rounded-lg bg-card/40 border border-border/30 hover:bg-card/60 transition-colors cursor-pointer flex justify-between items-center group">
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-primary transition-colors">Q4 Strategy Review</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">62% Match</span>
                </div>
            </div>
        </div>
    );
}
