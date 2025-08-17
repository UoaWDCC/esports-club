import React from "react";
import Image from "next/image";
import Link from "next/link";

import { EventType } from "@/types/EventType";

interface EventCardProps {
    event?: EventType;
}
export default function IndiviudalEventCard({ event }: EventCardProps) {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col">
                <p className="text-2xl">About</p>
                <h1 className="text-5xl">Tentative Title</h1>
            </div>
            <div className="flex w-full flex-col items-center gap-10 md:flex-row">
                <div className="w-full md:w-1/2">
                    <Image
                        src="/assets/landing/placeholder3.png"
                        alt="an event in auec"
                        width={800}
                        height={600}
                        className="h-auto w-full"
                    />
                </div>
                <div className="flex w-full flex-col gap-5 md:w-1/2">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-5xl">Ipsum Lorem</h2>
                        <p className="text-md">
                            I think there's a big difference between the average ranking of someone
                            who could perform well against CPU8 if they specifically trained against
                            it and learned its habits and weaknesses, versus the ranking CPU8 would
                            reach if it was dropped into ranked. Against opponents playing a Ft2 who
                            don't know they are playing CPU8 and might not have much experience
                            against CPU8 anyway, I think the CPU cruises at least to Diamond and
                            possibly somewhere in Master
                        </p>
                    </div>
                    <Link href={""} className="underline">
                        LEARN MORE
                    </Link>
                </div>
            </div>
        </div>
    );
}
