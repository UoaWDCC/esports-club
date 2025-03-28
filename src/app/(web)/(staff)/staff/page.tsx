import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

import { auth } from "@/auth";

export default async function StaffPage() {
    const session = await auth();

    return (
        <StandardLayout>
            <h1 className="max-w-[600px]">Staff page</h1>
            <p>{JSON.stringify(session)}</p>

            <Footer />
        </StandardLayout>
    );
}
