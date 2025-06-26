import { getSession } from "@libs/auth/auth";

import Button from "@/components/button/Button";
import GoogleAuthButton from "@/components/button/GoogleAuthButton";
import SignOut from "@/components/button/SignOut";
import TriggerVerificationButton from "@/components/button/TestSendVerification";
import Footer from "@/components/footer/Footer";
import PageLayout from "@/components/layout/PageLayout";
import SlideInText from "@/components/text/SlideInText";

export default async function HomePage() {
    const session = await getSession();

    return (
        <>
            <PageLayout>
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
                        <Button href="/api/public" variant={{ style: "solid" }}>
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
                <TriggerVerificationButton />
                <SignOut />
                <h3>Info</h3>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </PageLayout>

            <Footer />
        </>
    );
}
