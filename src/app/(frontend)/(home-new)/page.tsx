import React from "react";

import { PageLayout } from "@/components/layout/PageLayout";

import { Hero } from "./_components/Hero/Hero";
import Sponsors from "./_components/Sponsors/Sponsors";
import { UpcomingEventCard } from "./_components/UpcomingEvents/_components/UpcomingEventCard";
import { events } from "./_data/events";
import { SponsorCard } from "./_components/Sponsors/_components/SponsorCard";
import { sponsors } from "./_data/sponsors";

export default function page() {
    return (
        <PageLayout>
            <Hero />
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
            <div className="flex flex-wrap gap-6">
                {sponsors.map((sponsor, index) => (
                   <SponsorCard name={sponsor.name} description={sponsor.description} sponsorType={sponsor.sponsorType} image={sponsor.image}/>
                ))}
            </div>
            <Sponsors />
        </PageLayout>
    );
}
