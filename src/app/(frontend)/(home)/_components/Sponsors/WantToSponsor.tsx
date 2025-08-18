import React from "react";

import { Button } from "@/components/button/Button";

export function WantToSponsor() {
    return (
        <div className="flex h-[300px] w-full flex-col items-center justify-center gap-10 md:flex-row">
            <div className="flex flex-col">
                <p className="text-5xl font-medium">Interested in a Sponsorship?</p>
                <p className="text-2xl">Let’s explore what AUEC can do for your organization.</p>
            </div>
            <Button variant={{ style: "solid" }}>Find out More</Button>
        </div>
    );
}
