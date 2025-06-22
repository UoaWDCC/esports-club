import { getSession } from "@libs/auth/auth";
import Button from "@ui/button/Button";
import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import TriggerVerificationButton from "@ui/button/TestSendVerification";
import Footer from "@ui/footer/Footer";
import SignOut from "@ui/form/SignOut";
import StandardLayout from "@ui/layout/StandardLayout";
import SlideInText from "@ui/text/SlideInText";

export default async function Home() {
    const session = await getSession();

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
                <TriggerVerificationButton />
                <SignOut />
                <h3>Info</h3>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </StandardLayout>

            <Footer />
        </>
    );
}
