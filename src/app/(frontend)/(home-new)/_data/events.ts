import { EventType } from "../_components/UpcomingEvents/_types/event";

export const events: EventType[] = [
    {
        title: "AUEC X SESA Valorant Clash", 
        date: "August 12th",
        game: "VALORANT",
        image: {src:"/assets/landing/auec-sesa-valorant.png", alt:"SESA Valorant tournament"},
        numPeople: 67
    }, {
        title: "Grande Valorant Watch Party",
        date: "August 17th",
        game: "VALORANT",
        image: {src:"/assets/landing/valorant-watch-party", alt:"Valorant Watch Party"},
        numPeople: 25,
    }, {
        title: "AUEC X VUWG Showmatch",
        date: "August 24th",
        game: "MULTI-GAME",
        image: {src:"/assets/landing/auec-vuwg-showmatch.png", alt:"VUWG Showmatch"},
        numPeople: 32,
    }, {
        title: "Rage Art Rumble 2025 Round 1",
        date: "August 31st",
        game: "TEKKEN",
        image: {src:"/assets/landing/rage-art-rumble.png", alt:"Rage Art Rumble Round 1"},
        numPeople: 48,
    }
];
