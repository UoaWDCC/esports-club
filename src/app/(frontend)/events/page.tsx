import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

import EventSection from "./_components/EventSection";

export default function page() {
    return (
        <PageLayout>
            <h1 className="text-7xl font-medium">Events & Tournaments</h1>
            <EventSection />
        </PageLayout>
    );
}
