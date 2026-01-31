"use client";

import { ActionItem } from "@/lib/types";
import { Check, Square, Maximize2 } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { motion } from "framer-motion";
import { ZenModeOverlay } from "../ui/ZenModeOverlay";

export function ActionList({ actions, zenModeTrigger = false }: { actions: ActionItem[], zenModeTrigger?: boolean }) {
    // Local state for demo purposes until wired to store updates
    const [items, setItems] = useState(actions);
    const [zenItem, setZenItem] = useState<string | null>(null);

    const toggle = (id: string) => {
        setItems(items.map(i => i.id === id ? { ...i, isCompleted: !i.isCompleted } : i));
    };

    return (
        <>
            <ZenModeOverlay
                isOpen={!!zenItem}
                actionText={zenItem || ""}
                onClose={() => setZenItem(null)}
            />
            <ul className="space-y-3">
                {items.map((action) => (
                    <motion.li
                        key={action.id}
                        layout
                        className="flex items-start gap-3 group relative pr-8"
                    >
                        <div
                            className={clsx(
                                "mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-colors border cursor-pointer",
                                action.isCompleted ? "bg-accent border-accent text-accent-foreground" : "border-muted-foreground/40 group-hover:border-accent/50"
                            )}
                            onClick={() => toggle(action.id)}
                        >
                            {action.isCompleted && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <span
                            onClick={() => toggle(action.id)}
                            className={clsx(
                                "text-sm leading-relaxed transition-all cursor-pointer",
                                action.isCompleted ? "text-muted-foreground line-through decoration-border" : "text-foreground"
                            )}
                        >
                            {action.text}
                        </span>

                        {!action.isCompleted && (
                            <button
                                onClick={() => setZenItem(action.text)}
                                className="absolute right-0 top-0 p-1 text-muted-foreground hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Modo Zen"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        )}
                    </motion.li>
                ))}
            </ul>
        </>
    );
}
