import { ImageType } from "@/types/ImageType";

export type EventType = {
    game: string;
    title: string;
    date: string; // Format: "August 12th"
    numPeople: number;
    image: ImageType;
};
