"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Laptop, Moon, Sun, Plus, Home, Settings, Search, CheckCheck, Mic, Share2 } from "lucide-react";

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-background/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4">
            <div
                className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100"
                onClick={(e) => e.stopPropagation()}
            >
                <Command className="w-full">
                    <div className="flex items-center border-b border-border px-3">
                        <Search className="w-5 h-5 text-muted-foreground mr-2 shrink-0" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="w-full h-14 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-medium"
                        />
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto p-2">
                        <Command.Empty className="p-4 text-center text-sm text-muted-foreground">No results found.</Command.Empty>

                        <Command.Group heading="Actions" className="text-xs font-medium text-muted-foreground px-2 py-1.5 mb-2">
                            <Item onSelect={() => runCommand(() => router.push("/capture"))}>
                                <Plus className="w-4 h-4 mr-2" />
                                New Capsule
                            </Item>
                            <Item onSelect={() => runCommand(() => router.push("/review"))}>
                                <CheckCheck className="w-4 h-4 mr-2" />
                                Review Inbox
                            </Item>
                            <Item onSelect={() => console.log("Toggle Theme")}>
                                <Moon className="w-4 h-4 mr-2" />
                                Toggle Dark Mode
                            </Item>
                        </Command.Group>

                        <Command.Group heading="Navigation" className="text-xs font-medium text-muted-foreground px-2 py-1.5 mb-2">
                            <Item onSelect={() => runCommand(() => router.push("/dashboard"))}>
                                <Home className="w-4 h-4 mr-2" />
                                Go to Dashboard
                            </Item>
                            <Item onSelect={() => runCommand(() => router.push("/capture/voice"))}>
                                <Mic className="w-4 h-4 mr-2" />
                                Voice Mode
                            </Item>
                            <Item onSelect={() => runCommand(() => router.push("/graph"))}>
                                <Share2 className="w-4 h-4 mr-2" />
                                Knowledge Graph
                            </Item>
                            <Item onSelect={() => runCommand(() => router.push("/history"))}>
                                <Laptop className="w-4 h-4 mr-2" />
                                History
                            </Item>
                            <Item onSelect={() => runCommand(() => router.push("/settings"))}>
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </Item>
                        </Command.Group>

                    </Command.List>
                </Command>

                <div className="p-2 border-t border-border bg-muted/30 text-[10px] text-muted-foreground flex justify-between px-4">
                    <span>Pro Tip: Use arrow keys to navigate</span>
                    <span>ESC to close</span>
                </div>
            </div>

            {/* Click outside to close */}
            <div className="absolute inset-0 z-[-1]" onClick={() => setOpen(false)} />
        </div>
    );
}

function Item({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="flex items-center px-3 py-2.5 rounded-lg text-sm text-foreground cursor-pointer data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground transition-colors"
        >
            {children}
        </Command.Item>
    )
}
