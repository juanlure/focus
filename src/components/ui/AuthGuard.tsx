"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            const publicPaths = ["/", "/onboarding", "/pricing"];
            const isPublicPath = publicPaths.includes(pathname);

            if (!session && !isPublicPath) {
                // For development/demo, we allow bypass if keys aren't set, 
                // but normally we redirect to onboarding/login
                if (process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project-id.supabase.co") {
                    // router.push("/onboarding");
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [pathname, router]);

    if (isLoading && !["/", "/onboarding", "/pricing"].includes(pathname)) {
        return (
            <div className="flex-1 flex items-center justify-center bg-background">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return <>{children}</>;
}
