"use client";

import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function TeamInvite() {
    return (
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Users className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <h3 className="font-bold text-base mb-1 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    Invite your Team
                </h3>
                <p className="text-xs text-muted-foreground mb-4 max-w-[80%]">
                    Unlock shared brain spaces and collaborate on capsules. Pro feature.
                </p>

                <Link href="/pricing">
                    <button className="text-xs font-bold bg-background text-foreground px-4 py-2 rounded-lg border border-border/50 hover:bg-muted transition-colors flex items-center gap-1 shadow-sm">
                        Create Organization <ArrowRight className="w-3 h-3" />
                    </button>
                </Link>
            </div>
        </div>
    );
}
