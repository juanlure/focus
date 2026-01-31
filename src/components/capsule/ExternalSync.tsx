"use client";

import { FileText, Database, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export function ExternalSync() {
    const [syncedTo, setSyncedTo] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);

    const handleSync = (app: string) => {
        setIsSyncing(true);
        setTimeout(() => {
            setIsSyncing(false);
            setSyncedTo(app);
            setTimeout(() => setSyncedTo(null), 3000); // Reset for demo re-use
        }, 1200);
    };

    return (
        <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold mr-2">Sync:</span>

            <button
                onClick={() => handleSync("Notion")}
                disabled={isSyncing}
                className="p-2 rounded-lg bg-card border border-border/50 hover:bg-card/80 transition-colors relative overflow-hidden"
                title="Export to Notion"
            >
                {syncedTo === "Notion" ? (
                    <Check className="w-4 h-4 text-green-500" />
                ) : (
                    <>
                        <Database className="w-4 h-4 text-foreground/70" />
                        {isSyncing && <motion.div className="absolute inset-0 bg-primary/20" layoutId="sync-overlay" />}
                    </>
                )}
            </button>

            <button
                onClick={() => handleSync("Obsidian")}
                disabled={isSyncing}
                className="p-2 rounded-lg bg-card border border-border/50 hover:bg-card/80 transition-colors relative overflow-hidden"
                title="Export to Obsidian"
            >
                {syncedTo === "Obsidian" ? (
                    <Check className="w-4 h-4 text-purple-500" />
                ) : (
                    <>
                        <FileText className="w-4 h-4 text-foreground/70" />
                        {isSyncing && <motion.div className="absolute inset-0 bg-primary/20" layoutId="sync-overlay" />}
                    </>
                )}
            </button>

            {syncedTo && (
                <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-green-500 font-medium"
                >
                    Synced to {syncedTo}
                </motion.span>
            )}
        </div>
    );
}
