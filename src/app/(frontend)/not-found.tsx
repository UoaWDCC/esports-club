"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/button/Button";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-6">
                <h3 className="text-2xl">404 - Page not found</h3>
                <div className="flex gap-3">
                    <Button onClick={() => router.back()} variant={{ style: "cta" }}>
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
}
