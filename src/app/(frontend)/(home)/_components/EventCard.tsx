import React from "react";

interface animal {
    name: string;
}

interface dog extends animal {
    breed: string;
}

export default function EventCard() {
    return <div>EventCard</div>;
}
