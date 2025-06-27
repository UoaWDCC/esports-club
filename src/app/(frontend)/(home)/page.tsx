import Link from "next/link";

import { Button } from "@/components/button/Button";

import { InformationPanel } from "./components/InformationPanel";
import { socialLinks } from "./data/social.data";

export default function landing() {
    const about = {
        title: "About Us",
        subtitle: "We run the university Esports Arena",
        description:
            "Level up your university experience at our Esports Arena - where passion meets play, and champions are born.",
    };

    const membership = {
        title: "Membership",
        subtitle: "Participate in social events or tournaments with Prizes",
        description:
            "We run tournament through out the year, by becoming a member you participate in our events for free!",
    };

    return (
        <>
            <div className="font-tomorrow flex flex-col items-center gap-24">
                <div className="font-tomorrow flex flex-col items-center gap-12">
                    <h3 className="font-tomorrow text-6xl font-light">
                        Auckland University Esport Club
                    </h3>
                    <p className="font-satoshi">
                        University of Auckland student-led club bringing students together to
                        socialise and compete
                    </p>
                    <SocialsSubheading />
                </div>

                <div className="flex flex-row gap-55">
                    <div className="flex flex-col gap-12">
                        <div>
                            <InformationPanel {...about} />
                        </div>
                        <div>
                            <div className="flex flex-col gap-4 pl-16">
                                <InformationPanel
                                    {...membership}
                                    variant={{ headerColour: "pink" }}
                                />
                                <div className="flex flex-row gap-4">
                                    <Button href="/member" variant={{ style: "primary" }}>
                                        Become a member!
                                    </Button>
                                    <Button href="/events" variant={{ style: "secondary" }}>
                                        See past events
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="/images/landing_image.png" className="-translate-y-1/30" />
                    </div>
                </div>
            </div>
        </>
    );
}

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
