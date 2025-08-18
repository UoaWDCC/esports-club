import React from "react";
import Link from "next/link";

import { PageLayout } from "@/components/layout/PageLayout";

export default function NotFound() {
    return (
        <PageLayout>
            <div className="flex flex-col items-center justify-center space-y-6 py-20">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <h2 className="text-3xl font-medium text-gray-600">Event Not Found</h2>
                <p className="max-w-md text-center text-lg text-gray-500">
                    Sorry, we couldn't find the event you're looking for. It may have been moved or
                    doesn't exist.
                </p>
                <Link
                    href="/events"
                    className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                    Back to Events
                </Link>
            </div>
        </PageLayout>
    );
}
