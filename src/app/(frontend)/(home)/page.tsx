import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

import { Hero } from "./_components/Hero/Hero";
import { SponsorCard } from "./_components/Sponsors/SponsorCard";
import Sponsors from "./_components/Sponsors/Sponsors";
import IndiviudalEventCard from "./_components/UpcomingEvents/IndiviudalEventCard";
import { UpcomingEventCard } from "./_components/UpcomingEvents/UpcomingEventCard";
import { events } from "./_data/events";
import { sponsors } from "./_data/sponsors";

export default function page() {
    return (
        <PageLayout>
            <Hero />
            <section className="">
                <div className="flex flex-wrap gap-4">
                    {events.map((event, index) => (
                        <UpcomingEventCard
                            title={event.title}
                            date={event.date}
                            image={event.image}
                            game={event.game}
                            numPeople={event.numPeople}
                            key={index}
                        />
                    ))}
                </div>
            </section>
            <section className="flex flex-col">
                <IndiviudalEventCard />
            </section>
            <section className="">
                <div className="flex flex-wrap gap-6">
                    {sponsors.map((sponsor, index) => (
                        <SponsorCard
                            name={sponsor.name}
                            description={sponsor.description}
                            sponsorType={sponsor.sponsorType}
                            image={sponsor.image}
                            key={index}
                        />
                    ))}
                </div>
            </section>
            <Sponsors />
        </PageLayout>
    );
}
