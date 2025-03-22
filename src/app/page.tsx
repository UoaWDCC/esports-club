import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

export default function Home() {
    return (
        <>
            <StandardLayout>
                <h3>Esport website</h3>
                <p>
                    this website is about <em>tournament management</em> and <em>membership registration</em> this is
                    not the actual text just some test placeholder to test the text lol
                </p>
                <h3>This is the landing page</h3>

                <div className="grid size-20 animate-spin place-items-center rounded-lg bg-slate-700">wee</div>
            </StandardLayout>
            <Footer />
        </>
    );
}
