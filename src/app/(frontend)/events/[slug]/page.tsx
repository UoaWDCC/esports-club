import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";

import { PageLayout } from "@/components/layout/PageLayout";
import { titleToSlug } from "@/libs/utils/slug";

import { events } from "../_data/events";

interface EventPageProps {
    params: {
        slug: string;
    };
}

// Function to find event by slug
function findEventBySlug(slug: string) {
    return events.find((event) => titleToSlug(event.title) === slug);
}

export default function EventPage({ params }: EventPageProps) {
    const event = findEventBySlug(params.slug);

    if (!event) {
        notFound();
    }

    return (
        <PageLayout>
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col space-y-4">
                    <h1 className="text-5xl font-bold">{event.title}</h1>
                    <div className="text-foreground flex flex-col space-y-2">
                        <p className="text-xl">Date: {event.date}</p>
                        <p className="text-xl">Game: {event.game}</p>
                        <p className="text-xl">Type: {event.type}</p>
                        <p className="text-xl">Participants: {event.numPeople}</p>
                    </div>
                </div>

                <div className="relative h-96 w-full">
                    <Image
                        src={event.image.src}
                        alt={event.image.alt}
                        fill
                        className="rounded-lg object-cover"
                    />
                </div>

                <div className="flex flex-col space-y-4">
                    <h2 className="text-3xl font-semibold">About This Event</h2>
                    <p className="text-lg leading-relaxed">{event.description.extended}</p>
                </div>

                {event.sponsors && event.sponsors.length > 0 && (
                    <div className="flex flex-col space-y-4">
                        <h2 className="text-3xl font-semibold">Sponsors</h2>
                        <div className="flex flex-wrap gap-4">
                            {event.sponsors.map((sponsor, index) => (
                                <div key={index} className="flex items-center">
                                    <p className="text-lg">{sponsor.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </PageLayout>
    );
}

// Generate static params for all events
export async function generateStaticParams() {
    return events.map((event) => ({
        slug: titleToSlug(event.title),
    }));
}
