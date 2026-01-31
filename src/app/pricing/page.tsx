"use client";

import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background p-6 max-w-md mx-auto">
            <nav className="flex justify-between items-center mb-12">
                <Link href="/" className="font-bold text-xl">FocusBrief.</Link>
                <Link href="/" className="text-sm font-medium text-muted-foreground">Close</Link>
            </nav>

            <h1 className="text-4xl font-bold mb-4 text-center">Invest in your mind</h1>
            <p className="text-center text-muted-foreground mb-12">Choose the plan that fits your ambition.</p>

            <div className="space-y-6">
                {/* Free Plan */}
                <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                    <h2 className="text-xl font-medium mb-2">Starter</h2>
                    <div className="text-4xl font-bold mb-6">$0</div>
                    <ul className="space-y-3 mb-8 text-sm">
                        <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> 5 Capsules / Day</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Standard Processing</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-green-500" /> Mobile App Access</li>
                    </ul>
                    <Link href="/onboarding">
                        <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 font-bold transition-colors">
                            Start Free
                        </button>
                    </Link>
                </div>

                {/* Pro Plan */}
                <div className="p-8 rounded-3xl border-2 border-primary bg-primary/5 relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-full tracking-wider">
                        Most Popular
                    </div>
                    <h2 className="text-xl font-medium mb-2 text-primary">Pro Focus</h2>
                    <div className="text-4xl font-bold mb-6">$15 <span className="text-lg font-medium text-muted-foreground">/mo</span></div>
                    <ul className="space-y-3 mb-8 text-sm">
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> <strong>Unlimited</strong> Capsules</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Priority Neural Engine</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Zen Mode Access</li>
                        <li className="flex gap-2"><Check className="w-4 h-4 text-primary" /> Morning Briefing (Audio)</li>
                    </ul>
                    <Link href="/onboarding">
                        <button className="w-full py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold transition-colors shadow-lg shadow-primary/25">
                            Get Pro
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
