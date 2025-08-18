import React from "react";

import { events } from "../_data/events";
import IndiviudalEventCard from "./IndiviudalEventCard";

export default function EventSection() {
    return (
        <section className="flex flex-col">
            {events.map((event, index) => (
                <IndiviudalEventCard event={event} key={index} />
            ))}
        </section>
    );
}
