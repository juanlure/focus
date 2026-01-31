"use client";

import { Header } from "@/components/ui/Header";
import { BrainStats } from "@/components/dashboard/BrainStats";
import { IOSInstallGuide } from "@/components/ui/IOSInstallGuide";
import { CapsuleCard } from "@/components/capsule/CapsuleCard";
import { useFocusStore } from "@/store/useFocusStore";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function Home() {
  const { userName, capsules } = useFocusStore();
  const recentCapsules = capsules.slice(0, 3);

  return (
    <main className="flex-1 overflow-y-auto pb-24 relative bg-background">
      <Header />
      <IOSInstallGuide />

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <section>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Buenos días, <span className="text-primary">{userName || 'explorador'}</span>.
          </h1>
          <p className="text-muted-foreground text-sm">
            Tu cerebro digital está activo. {capsules.length === 0 ? "Sin" : capsules.length} {capsules.length === 1 ? "cápsula" : "cápsulas"} pendientes.
          </p>

          <BrainStats />
        </section>

        {/* Recent Activity */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold">Actividad Reciente</h2>
            <Link href="/history" className="text-xs font-bold text-primary flex items-center gap-1">
              Ver todo <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {capsules.length === 0 ? (
            <div className="p-8 rounded-2xl bg-muted/20 border border-dashed border-border/50 text-center space-y-2">
              <p className="text-sm text-muted-foreground">Aún no has capturado nada.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentCapsules.map((capsule) => (
                <Link key={capsule.id} href={`/capsule/${capsule.id}`}>
                  <CapsuleCard capsule={capsule} />
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <Link href="/capture">
            <button className="shadow-[0_0_30px_-5px_rgba(var(--primary),0.4)] hover:shadow-[0_0_40px_-5px_rgba(var(--primary),0.6)] transition-shadow bg-primary text-primary-foreground rounded-full px-8 py-4 font-bold text-lg flex items-center gap-2">
              <Plus className="w-6 h-6" /> Capturar Idea
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
