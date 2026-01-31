import { Header } from "@/components/ui/Header";
import { BrainStats } from "@/components/dashboard/BrainStats";
import { TeamInvite } from "@/components/dashboard/TeamInvite";
import { IOSInstallGuide } from "@/components/ui/IOSInstallGuide";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 overflow-y-auto pb-24 relative bg-background">
      <Header />
      <IOSInstallGuide />

      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <section>
          <h1 className="text-3xl font-bold tracking-tight mb-1">
            Buenos días, <span className="text-primary">Juanlu</span>.
          </h1>
          <p className="text-muted-foreground text-sm">
            Tu cerebro digital está activo. 3 cápsulas pendientes.
          </p>

          <BrainStats />
        </section>

        <TeamInvite />

        {/* Action Button */}
        <div className="flex justify-center pt-4">
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
