"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Plus, Settings, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

const navItems = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/review", label: "Review", icon: CheckCheck },
    { href: "/capture", label: "Capturar", icon: Plus, isFab: true },
    { href: "/history", label: "Historial", icon: Layers },
    { href: "/settings", label: "Configurar", icon: Settings },
];

export function BottomNav() {
    const pathname = usePathname();

    // Hide on Landing, Onboarding, and Pricing pages
    if (['/', '/onboarding', '/pricing'].includes(pathname)) {
        return null;
    }

    return (
        <nav className="h-20 pb-6 pt-2 bg-card/90 backdrop-blur-lg border-t border-border/40 fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto">
            <ul className="flex justify-around items-center h-full px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    if (item.isFab) {
                        return (
                            <li key={item.href} className="relative -top-5">
                                <Link href={item.href} className="group flex flex-col items-center justify-center">
                                    <motion.div
                                        whileTap={{ scale: 0.9 }}
                                        className="w-14 h-14 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/40 text-accent-foreground"
                                    >
                                        <Icon className="w-7 h-7" />
                                    </motion.div>
                                </Link>
                            </li>
                        );
                    }

                    return (
                        <li key={item.href} className="flex-1">
                            <Link href={item.href} className="group flex flex-col items-center justify-center gap-1 relative">
                                <div className={clsx(
                                    "p-1.5 rounded-xl transition-colors",
                                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                )}>
                                    <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute -bottom-2 w-1 h-1 bg-primary rounded-full"
                                    />
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
