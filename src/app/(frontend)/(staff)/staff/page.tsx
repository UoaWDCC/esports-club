import { Suspense } from "react";
import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Footer from "@ui/footer/Footer";
import StandardLayout from "@ui/layout/StandardLayout";

import { auth } from "@/auth";
import { getComment } from "@/server/comments";

import MockUser from "./_components/MockComment";

export default async function StaffPage() {
    const session = await auth();

    if (session?.user.role !== "staff") {
        redirect("/login");
    }
    const queryClient = new QueryClient();

    // prefetch the api on the serverside
    // doesn't need client to be rendered in to start fetching
    queryClient.prefetchQuery({
        queryKey: ["user"],
        queryFn: getComment,
    });

    const dehydratedState = dehydrate(queryClient);

    return (
        <HydrationBoundary state={dehydratedState}>
            <StandardLayout>
                <h1 className="max-w-[600px]">Staff page</h1>
                <p>{JSON.stringify(session)}</p>
                <Footer />
                <MockUser />
            </StandardLayout>
        </HydrationBoundary>
    );
}
