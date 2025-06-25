import PageLayout from "@ui/layout/PageLayout";

// requires user to be logged in
// requires user to NOT have a profile
export default async function ProfileCreationPage() {
    return (
        <PageLayout>
            <h1 className="text-3xl">Profile Creation page</h1>
        </PageLayout>
    );
}
