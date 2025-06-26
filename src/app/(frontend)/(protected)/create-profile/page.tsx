import FormLayout from "@/components/layout/FormLayout";

// requires user to be logged in
// requires user to NOT have a profile
// see (protected)/create-profile/layout.tsx
export default async function ProfileCreationPage() {
    return (
        <FormLayout>
            <div>
                <h1 className="text-3xl">Profile Creation page</h1>
            </div>
        </FormLayout>
    );
}
