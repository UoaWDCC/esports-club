import React from "react";
import Image from "next/image";

import { ImageType } from "@/types/ImageType";

interface SponsorCardProps {
    name: string;
    sponsorType: string;
    description: string;
    image: ImageType;
}

export function SponsorCard({ name, sponsorType, description, image }: SponsorCardProps) {
    return (
        <div className="flex w-[255px] flex-col gap-5">
            <div className="justify-content flex h-[255px] flex-row items-center rounded-md bg-neutral-800">
                <Image src={image.src} alt={image.alt} width={100} height={100} />
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <p className="text-sm">{sponsorType}</p>
                    <p className="text-xl">{name}</p>
                </div>
                <p className="text-sm">{description}</p>
            </div>
        </div>
    );
}
