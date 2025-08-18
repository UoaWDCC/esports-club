import React from "react";
import Image from "next/image";
import Link from "next/link";

import { EventType } from "@/types/EventType";

import { titleToSlug } from "@/libs/utils/slug";

interface EventCardProps {
    event: EventType;
}
export default function IndiviudalEventCard({ event }: EventCardProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col">
                <p className="text-2xl">{event.type}</p>
                <h1 className="text-5xl">{event.game}</h1>
            </div>
            <div className="flex w-full flex-col items-center gap-10 md:flex-row">
                <div className="w-full md:w-1/2">
                    <Image
                        src={event.image.src}
                        alt={event.image.alt}
                        width={800}
                        height={600}
                        className="h-auto w-full"
                    />
                </div>
                <div className="flex w-full flex-col gap-5 md:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-5xl">{event.title}</h2>
                        <p className="text-md">{event.description.breif}</p>
                    </div>
                    <Link href={`/events/${titleToSlug(event.title)}`} className="underline">
                        LEARN MORE
                    </Link>
                </div>
            </div>
        </div>
    );
}
