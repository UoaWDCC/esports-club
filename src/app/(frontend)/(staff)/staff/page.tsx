import { redirect } from "next/navigation";
import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

import { auth } from "@/auth";

import MockUser from "./_components/MockUser";

export default async function StaffPage() {
    const session = await auth();
    console.log(session?.user);

    if (session?.user.role !== "staff") {
        redirect("/login");
    }

    return (
        <StandardLayout>
            <h1 className="max-w-[600px]">Staff page</h1>
            <p>{JSON.stringify(session)}</p>
            <MockUser />
            <Footer />
        </StandardLayout>
    );
}
