import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

import { Hero } from "./_components/Hero/Hero";
import { HeroDivider } from "./_components/HeroDivider";
import { SponsorSection } from "./_components/Sponsors/SponsorSection";
import IndiviudalEventCard from "./_components/UpcomingEvents/IndiviudalEventCard";
import { UpcomingEventSection } from "./_components/UpcomingEvents/UpcomingEventSection";

export default function page() {
    return (
        <PageLayout>
            <Hero />
            <UpcomingEventSection />
            <HeroDivider />
            <section className="flex flex-col">
                <IndiviudalEventCard />
            </section>
            <HeroDivider />
            <SponsorSection />
        </PageLayout>
    );
}
