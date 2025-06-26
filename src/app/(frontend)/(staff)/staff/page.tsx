import { getSession } from "@libs/auth/auth";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Footer } from "@/components/footer/Footer";
import { PageLayout } from "@/components/layout/PageLayout";
import { getComment } from "@/services/comments";

export default async function StaffPage() {
    const session = await getSession();

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
            <PageLayout>
                <h1 className="max-w-[600px]">Staff page</h1>
                <p>{JSON.stringify(session, null, 4)}</p>
                <Footer />
            </PageLayout>
        </HydrationBoundary>
    );
}
