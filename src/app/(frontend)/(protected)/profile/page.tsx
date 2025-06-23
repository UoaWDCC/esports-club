import { getSession } from "@libs/auth/auth";
import Footer from "@ui/footer/Footer";
import PageLayout from "@ui/layout/PageLayout";

export default async function ProfilePage() {
    const session = await getSession();

    return (
        <PageLayout>
            <h1 className="max-w-[600px]">Profile page</h1>
            <p>{JSON.stringify(session)}</p>

            <Footer />
        </PageLayout>
    );
}
