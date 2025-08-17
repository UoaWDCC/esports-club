import React from "react";
import Link from "next/link";

import { socialLinks } from "../data/social.data";

export const HeroSection = () => {
    return (
        <div className="font-tomorrow flex flex-col items-center gap-12">
            <Heading />
            <SubHeading />
            <SocialsSubheading />
        </div>
    );
};

export const Heading = () => {
    return <h3 className="font-tomorrow text-6xl font-light">Auckland University Esport Club</h3>;
};
export const SubHeading = () => {
    return (
        <p className="font-satoshi">
            University of Auckland student-led club bringing students together to socialise and
            compete
        </p>
    );
};
const SocialsSubheading = () => {
    return (
        <div className="flex gap-3">
            {socialLinks.map((item) => (
                <Link
                    key={item.url}
                    href={item.url}
                    className="grid aspect-square place-items-center bg-white p-1"
                >
                    <item.icon />
                </Link>
            ))}
        </div>
    );
};
