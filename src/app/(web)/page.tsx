import Button from "@ui/button/Button";
import GoogleAuthButton from "@ui/button/GoogleAuthButton";
import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

export default async function Home() {
    return (
        <>
            <StandardLayout>
                <div className="flex">
                    <h1 className="max-w-[600px]">Auckland University Esports Club</h1>
                    <div className="flex gap-4">
                        <button>Sign in</button>
                        <button>Sign out</button>
                    </div>
                </div>
                <hr />
                <Button href="/out" variant={{ style: "cta" }}>
                    Test
                </Button>
                <Button variant={{ style: "solid" }}>Test</Button>
                <Button variant={{ style: "outline" }}>Test</Button>
                <Button variant={{ style: "google" }}>Test</Button>
                <GoogleAuthButton />
            </StandardLayout>
            <Footer />
        </>
    );
}
