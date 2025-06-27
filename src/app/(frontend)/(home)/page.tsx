import Image from "next/image";

import { LandingImage } from "@/components/assets/image";
import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

import { HeroSection } from "./components";
import { InformationPanel, InformationPanelProps } from "./components/InformationPanel";

const about: InformationPanelProps = {
    title: "About Us",
    subtitle: "We run the university Esports Arena",
    description:
        "Level up your university experience at our Esports Arena - where passion meets play, and champions are born.",
};

const membership: InformationPanelProps = {
    title: "Membership",
    subtitle: "Participate in social events or tournaments with Prizes",
    description:
        "We run tournament through out the year, by becoming a member you participate in our events for free!",
};

export default function LandingPage() {
    return (
        <PageLayout>
            <div className="font-tomorrow flex flex-col items-center gap-24">
                <HeroSection />
                <div className="flex justify-between gap-24">
                    <div className="flex flex-col gap-12">
                        <InformationPanel {...about} />
                        <InformationPanel {...membership} variant={{ headerColour: "pink" }} />
                        <div className="flex gap-3">
                            <Button href="/auth/sign-in" variant={{ style: "secondary" }}>
                                Become a member!
                            </Button>
                            <Button href="/events" variant={{ style: "cta" }}>
                                See upcoming events
                            </Button>
                        </div>
                    </div>
                    <div className="relative size-full">
                        <Image src={LandingImage} alt="landing image" />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
