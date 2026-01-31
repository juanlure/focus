import { Capsule } from "@/lib/types";
import { SentimentBadge } from "./SentimentBadge";
import { ActionList } from "./ActionList";
import { Clock } from "lucide-react";
import { StreamingText } from "@/components/ui/StreamingText";
import { DeepResearch } from "./DeepResearch";
import { ExternalSync } from "./ExternalSync";
import { SmartContext } from "./SmartContext";
import { SmartShare } from "./SmartShare";

export function CapsuleCard({ capsule }: { capsule: Capsule }) {
    return (
        <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-5 space-y-4 shadow-sm hover:bg-card/80 transition-colors">
            <div className="flex justify-between items-start">
                <SentimentBadge sentiment={capsule.sentiment} />
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                        <SmartShare capsule={capsule} />
                        {capsule.timeToRead && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {capsule.timeToRead}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-semibold leading-snug">
                    <StreamingText text={capsule.summary} />
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1 italic border-l-2 border-primary/20 pl-2">
                    De: "{capsule.originalContent.slice(0, 40)}..."
                </p>
                <ExternalSync />
            </div>

            <div className="pt-2 border-t border-border/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Accionables</h4>
                <ActionList actions={capsule.actions} zenModeTrigger={true} />
            </div>

            <DeepResearch />
            <SmartContext />
        </div>
    );
}
