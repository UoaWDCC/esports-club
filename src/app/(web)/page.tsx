import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

import { auth } from "@/auth";

import SignIn from "./_components/sign-in";

export default async function Home() {
    const session = await auth();

    return (
        <>
            <StandardLayout>
                <h3>Esport website</h3>
                <p>
                    this website is about <em>tournament management</em> and{" "}
                    <em>membership registration</em> this is not the actual text just some test
                    placeholder to test the text lol
                </p>
                <h3>This is the landing page</h3>
                <SignIn />
                <p>session: {JSON.stringify(session, null, 2)}</p>
                <div className="grid size-20 animate-spin place-items-center rounded-lg bg-slate-700">
                    wee
                </div>
            </StandardLayout>
            <Footer />
        </>
    );
}
