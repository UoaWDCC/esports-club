import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

import { auth } from "@/auth";

export default async function ProfilePage() {
    const session = await auth();

    return (
        <StandardLayout>
            <h1 className="max-w-[600px]">Profile page</h1>
            <p>{JSON.stringify(session)}</p>

            <Footer />
        </StandardLayout>
    );
}
