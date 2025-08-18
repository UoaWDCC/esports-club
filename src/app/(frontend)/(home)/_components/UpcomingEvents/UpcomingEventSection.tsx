import React from "react";

import { events } from "../../_data/events";
import { UpcomingEventCard } from "./UpcomingEventCard";

export function UpcomingEventSection() {
    return (
        <section>
            <div className="flex flex-wrap justify-center gap-4">
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
    );
}
