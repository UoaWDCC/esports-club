import Button from "@ui/button/Button";
import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import { Carousel } from "@ui/carousel/carousel";
import { CarouselEvent } from "@ui/carousel/event";
import Footer from "@ui/footer/Footer";
import SignOut from "@ui/form/SignOut";
import StandardLayout from "@ui/layout/StandardLayout";
import SlideInText from "@ui/text/SlideInText";

import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();
    return (
        <>
            <StandardLayout>
                <div className="flex">
                    <h1 className="max-w-[600px]">
                        <SlideInText>Auckland University Esports Club</SlideInText>
                    </h1>
                </div>
                <hr />
                <h3>Routes</h3>
                <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col gap-8">
                        <Button href="/staff" variant={{ style: "cta" }}>
                            /staff page (role: staff)
                        </Button>
                        <Button href="/profile" variant={{ style: "solid" }}>
                            /Profile page (role : user)
                        </Button>
                    </div>
                    <div className="flex flex-col gap-8">
                        <Button href="/api/staff" variant={{ style: "cta" }}>
                            /api/staff
                        </Button>
                        <Button href="/api/protected" variant={{ style: "solid" }}>
                            /api/protected
                        </Button>
                        <Button href="/api/public" variant={{ style: "outline" }}>
                            /api/public
                        </Button>
                    </div>
                </div>
                <h3>Authentication</h3>
                <Button href="/sign-in" variant={{ style: "solid" }}>
                    Login page
                </Button>
                <Button href="/sign-up" variant={{ style: "solid" }}>
                    Registration page
                </Button>
                <GoogleAuthButton />
                <SignOut />
                <h3>Info</h3>

                <Carousel>
                    <CarouselEvent title="Event 1" imageSrc="/images/events/Event1.png">
                        Event Description
                    </CarouselEvent>
                    <CarouselEvent title="Event 2" imageSrc="/images/events/Event2.png">
                        Event Description
                    </CarouselEvent>
                    <CarouselEvent title="Event 3" imageSrc="/images/events/Event3.png">
                        Event Description
                    </CarouselEvent>
                </Carousel>

                <pre>{JSON.stringify(session, null, 2)}</pre>
            </StandardLayout>

            <Footer />
        </>
    );
}
