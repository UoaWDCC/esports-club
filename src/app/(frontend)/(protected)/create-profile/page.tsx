import FormLayout from "@/components/layout/FormLayout";

import ProfileCreationForm from "./components/ProfileCreationForm";

// requires user to be logged in
// requires user to NOT have a profile
// see (protected)/create-profile/layout.tsx
export default async function ProfileCreationPage() {
    return (
        <FormLayout>
            <ProfileCreationForm />
        </FormLayout>
    );
}
