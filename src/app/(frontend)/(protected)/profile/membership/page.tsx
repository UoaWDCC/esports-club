import { MembershipInformation } from "./components/MembershipInformation";

// requires user to be logged in
// requires user to have a profile
// see (protected)/profile/layout.tsx
export default function MembershipPage() {
    return (
        <div className="flex items-center justify-center">
            <div className="mb-24 flex w-full max-w-5xl flex-col gap-6">
                <h1 className="font-tomorrow text-4xl">Membership</h1>
                <hr className="border-gray" />
                <MembershipInformation />
            </div>
        </div>
    );
}
