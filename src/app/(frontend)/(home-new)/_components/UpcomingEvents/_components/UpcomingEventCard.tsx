import React from "react";
import Image from "next/image";

import { ImageType } from "@/types/ImageType";

interface UpcomingEventCardProps {
    game: string;
    title: string;
    date: string;
    numPeople: number;
    image: ImageType;
}
export function UpcomingEventCard({ game, title, date, numPeople, image }: UpcomingEventCardProps) {
    return (
        <div className="flex flex-row">
            <div className="h-[266px] w-[853px]">
                <Image src={image.src} alt={image.alt} />
            </div>
        </div>
    );
}
