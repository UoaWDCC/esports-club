import React from "react";

import { sponsors } from "@/app/(frontend)/events/_data/sponsors";

import { SponsorCard } from "./SponsorCard";

export function SponsorSection() {
    return (
        <section className="">
            <div className="flex flex-wrap justify-center gap-6">
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
    );
}
