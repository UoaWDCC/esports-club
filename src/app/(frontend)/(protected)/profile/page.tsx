import { getSession } from "@libs/auth/auth";
import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

export default async function ProfilePage() {
    const session = await getSession();

    return (
        <StandardLayout>
            <h1 className="max-w-[600px]">Profile page</h1>
            <p>{JSON.stringify(session)}</p>

            <Footer />
        </StandardLayout>
    );
}
