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
        <div className="s flex w-[540px] flex-row overflow-hidden rounded-lg bg-neutral-800">
            <div className="relative w-[55%]">
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={300}
                    height={300}
                    className="h-full w-full"
                />
            </div>
            <div className="flex w-[45%] flex-col justify-center pl-6">
                <p className="text-sm">
                    <span className="font-bold">{game}</span> {date}
                </p>
                <p className="text-xl font-medium">{title}</p>
                <p className="text-sm">{numPeople} ATTENDING</p>
            </div>
        </div>
    );
}
