import React from "react";
import Image from "next/image";

import { PageLayout } from "@/components/layout/PageLayout";
import { Navbar } from "@/components/navbar/Navbar";

import { Hero } from "./_components/Hero/Hero";
import { HeroDivider } from "./_components/HeroDivider";
import { SponsorSection } from "./_components/Sponsors/SponsorSection";
import { WantToSponsor } from "./_components/Sponsors/WantToSponsor";
import IndiviudalEventCard from "./_components/UpcomingEvents/IndiviudalEventCard";
import { UpcomingEventSection } from "./_components/UpcomingEvents/UpcomingEventSection";

export default function page() {
    return (
        <>
            <div className="absolute inset-0 h-dvh w-dvw">
                <Image
                    className="object-cover"
                    src="/assets/landing/landing-image.png"
                    alt="Hero Background"
                    fill
                />
            </div>
            <div className="content-container relative h-dvh">
                <div className="flex flex-col gap-y-8 py-12">
                    <Navbar />
                    <Hero />
                </div>
            </div>
            <PageLayout className="bg-background">
                <UpcomingEventSection />
                <HeroDivider />
                <section className="flex flex-col">
                    <IndiviudalEventCard />
                </section>
                <HeroDivider />
                <SponsorSection />
                <WantToSponsor />
            </PageLayout>
        </>
    );
}
