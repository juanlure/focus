"use client";

import { Header } from "@/components/ui/Header";
import { motion } from "framer-motion";
import { ArrowLeft, Share2, ZoomIn, ZoomOut } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function KnowledgeGraphPage() {
    const [scale, setScale] = useState(1);

    // Mock Graph Data
    const nodes = [
        { id: 1, x: 50, y: 50, label: "SaaS Growth", size: 60, color: "#8b5cf6" },
        { id: 2, x: 20, y: 30, label: "Marketing", size: 40, color: "#ec4899" },
        { id: 3, x: 80, y: 30, label: "Product", size: 45, color: "#3b82f6" },
        { id: 4, x: 50, y: 80, label: "Retention", size: 35, color: "#10b981" },
        { id: 5, x: 20, y: 70, label: "Pricing", size: 30, color: "#f59e0b" },
        { id: 6, x: 80, y: 70, label: "Onboarding", size: 30, color: "#f59e0b" },
    ];

    const links = [
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
        { from: 2, to: 5 }, { from: 3, to: 6 }, { from: 4, to: 6 }
    ];

    return (
        <main className="h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center relative">
            <div className="absolute top-4 left-4 z-50">
                <Link href="/dashboard" className="p-3 bg-white/10 rounded-full backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors">
                    <ArrowLeft className="w-5 h-5 text-white" />
                </Link>
            </div>

            <div className="absolute top-4 right-4 z-50 flex gap-2">
                <button onClick={() => setScale(s => s + 0.1)} className="p-3 bg-white/10 rounded-full hover:bg-white/20"><ZoomIn className="w-5 h-5" /></button>
                <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-3 bg-white/10 rounded-full hover:bg-white/20"><ZoomOut className="w-5 h-5" /></button>
            </div>

            {/* 3D Graph Container */}
            <motion.div
                className="relative w-full h-full max-w-md mx-auto perspective-[1000px]"
                style={{ scale }}
                drag
                dragConstraints={{ left: -200, right: 200, top: -200, bottom: 200 }}
            >
                <svg className="w-full h-full pointer-events-none">
                    {links.map((link, i) => {
                        const start = nodes.find(n => n.id === link.from)!;
                        const end = nodes.find(n => n.id === link.to)!;
                        return (
                            <motion.line
                                key={i}
                                x1={`${start.x}%`} y1={`${start.y}%`}
                                x2={`${end.x}%`} y2={`${end.y}%`}
                                stroke="rgba(255,255,255,0.1)"
                                strokeWidth="1"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, delay: 0.5 }}
                            />
                        )
                    })}
                </svg>

                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className="absolute rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer hover:z-50"
                        style={{
                            left: `${node.x}%`,
                            top: `${node.y}%`,
                            width: node.size,
                            height: node.size,
                            backgroundColor: node.color,
                            x: "-50%",
                            y: "-50%"
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        whileHover={{ scale: 1.2, opacity: 1 }}
                        transition={{ duration: 0.5, delay: node.id * 0.1 }}
                    >
                        <span className="text-[8px] font-bold text-white pointer-events-none drop-shadow-md">{node.label}</span>
                    </motion.div>
                ))}
            </motion.div>

            <div className="absolute bottom-10 text-center pointer-events-none">
                <h2 className="text-white/50 text-xs tracking-[0.3em] font-light uppercase">Neural Connectivity</h2>
                <div className="text-white/20 text-[10px] mt-1">12 Active Nodes • 45 Connections</div>
            </div>
        </main>
    );
}
