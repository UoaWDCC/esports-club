import { redirect } from "next/navigation";
import { getSession } from "@libs/auth/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@libs/routes";

export default async function StaffLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getSession();

    console.log("fetching on staff layout");

    if (session?.user.role !== "staff") {
        redirect(DEFAULT_LOGIN_REDIRECT);
    }

    return children;
}
