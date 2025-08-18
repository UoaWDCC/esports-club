import { ImageType } from "@/types/ImageType";

import { SponsorType } from "./SponsorType";

export type EventType = {
    game: string;
    title: string;
    date: string;
    numPeople: number;
    image: ImageType;
    description: {
        breif: string;
        extended: string;
    };
    sponsors?: SponsorType[];
    type: "Event" | "Tournament";
};
