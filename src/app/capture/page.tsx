import { QuickCapture } from "@/components/inbox/QuickCapture";
import { Header } from "@/components/ui/Header";

export default function CapturePage() {
    return (
        <main className="flex-1 flex flex-col h-full bg-background">
            <Header />
            <QuickCapture />
        </main>
    );
}
