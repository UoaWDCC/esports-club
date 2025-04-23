import Button from "@ui/button/Button";
import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import Footer from "@ui/footer/Footer";
import SignOut from "@ui/form/SignOut";
import StandardLayout from "@ui/layout/StandardLayout";

import { auth } from "@/auth";

export default async function Home() {
    const session = await auth();
    return (
        <>
            <StandardLayout>
                <div className="flex">
                    <h1 className="max-w-[600px]">Auckland University Esports Club</h1>
                </div>
                <hr />
                <Button href="/staff" variant={{ style: "cta" }}>
                    Staff page
                </Button>
                <Button href="/profile" variant={{ style: "solid" }}>
                    Profile page
                </Button>
                <Button variant={{ style: "google" }}>Test</Button>
                <GoogleAuthButton />
                <SignOut />

                <pre>{JSON.stringify(session, null, 2)}</pre>
            </StandardLayout>
            <Footer />
        </>
    );
}
