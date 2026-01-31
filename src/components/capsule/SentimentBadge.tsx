import { Sentiment } from "@/lib/types";
import { clsx } from "clsx";
import { AlertCircle, Lightbulb, Coffee, CheckCircle } from "lucide-react";

export function SentimentBadge({ sentiment }: { sentiment: Sentiment }) {
    const config = {
        urgent: { color: "bg-red-500/10 text-red-500 border-red-500/20", icon: AlertCircle, label: "Urgente" },
        insightful: { color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Lightbulb, label: "Insight" },
        casual: { color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: Coffee, label: "Relajado" },
        "action-required": { color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: CheckCircle, label: "Acción" },
    };

    const { color, icon: Icon, label } = config[sentiment] || config.casual;

    return (
        <div className={clsx("flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-semibold", color)}>
            <Icon className="w-3.5 h-3.5" />
            <span>{label}</span>
        </div>
    );
}
