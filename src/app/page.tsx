"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Shield, Globe } from "lucide-react";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFocusStore } from "@/store/useFocusStore";

export default function LandingPage() {
  const router = useRouter();
  const { isOnboarded } = useFocusStore();

  useEffect(() => {
    if (isOnboarded) {
      router.replace("/dashboard");
    }
  }, [isOnboarded, router]);

  // Prevent flash
  if (isOnboarded) return null;

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-foreground overflow-y-auto pb-24">

      {/* Navbar Placeholder */}
      <nav className="p-6 flex justify-between items-center max-w-md mx-auto">
        <span className="font-bold text-xl tracking-tighter">FocusBrief.</span>
        <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
          Precios
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-12 pb-20 max-w-md mx-auto text-center relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/80 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Waitlist 2.0 Abierta
          </div>

          <h1 className="text-5xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
            Deja de ahogarte. <br /> Empieza a Enfocar.
          </h1>

          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Convierte el caos de información en cápsulas de acción de 30 segundos. El buzón inteligente para gente que hace cosas.
          </p>

          <div className="flex flex-col gap-4">
            <Link href="/onboarding">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-white text-black rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-xl shadow-white/10"
              >
                Empezar Gratis <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <p className="text-xs text-muted-foreground">Sin tarjeta de crédito • Cancela cuando quieras</p>
          </div>
        </motion.div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-md mx-auto text-center px-6">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Usado por líderes en</p>
          <div className="flex justify-between items-center opacity-40 grayscale">
            <Globe className="w-8 h-8" />
            <Zap className="w-8 h-8" />
            <Shield className="w-8 h-8" />
            <div className="font-serif font-bold text-xl">ACME</div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-20 max-w-md mx-auto space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Por qué nos aman</h2>
          <p className="text-muted-foreground">Bueno, "todos" es mucho decir. Pero casi.</p>
        </div>

        <div className="grid gap-6">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-yellow-400" />}
            title="Cápsulas Instantáneas"
            desc="La IA resume 1 hora de lectura en 3 puntos de acción."
          />
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-purple-400" />}
            title="Privacidad Total"
            desc="Tus datos son tuyos. Nunca entrenamos modelos con tus notas."
          />
          <FeatureCard
            icon={<CheckCircle className="w-6 h-6 text-green-400" />}
            title="Modo Zen"
            desc="Céntrate en una sola cosa. El estado de flujo definitivo."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 max-w-md mx-auto text-center text-xs text-muted-foreground border-t border-white/5">
        <p>© 2026 FocusBrief Inc. Unicorn Division.</p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}
