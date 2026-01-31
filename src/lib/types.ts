export type Sentiment = "urgent" | "insightful" | "casual" | "action-required" | "reflective" | "neutral";

export interface ActionItem {
    id: string;
    text: string;
    isCompleted: boolean;
}

export interface Capsule {
    id: string;
    originalContent: string;
    type: "text" | "url" | "file";
    summary: string;
    actions: ActionItem[];
    sentiment: Sentiment;
    createdAt: string;
    timeToRead?: string; // e.g. "30s"
}
