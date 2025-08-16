import { Button } from "@/components/button/Button";
import { PageLayout } from "@/components/layout/PageLayout";

import type { MembershipStatus, Session } from "./PricingClient";

interface Props {
    membershipStatus: MembershipStatus;
    session: Session | null;
}

export function PricingClientWithMembership({ membershipStatus, session }: Props) {
    return (
        <PageLayout>
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        You Already Have an Active Membership!
                    </h1>
                    <p className="mx-auto mb-6 max-w-2xl text-xl text-gray-600">
                        You currently have an active {membershipStatus.membershipType?.name}{" "}
                        membership.
                    </p>
                    <div className="mx-auto max-w-md rounded-lg border border-green-200 bg-green-50 p-6">
                        <h3 className="mb-2 text-lg font-semibold text-green-800">
                            Membership Details
                        </h3>
                        <p className="mb-2 text-green-700">
                            <strong>Plan:</strong> {membershipStatus.membershipType?.name}
                        </p>
                        <p className="mb-2 text-green-700">
                            <strong>Valid until:</strong>{" "}
                            {membershipStatus.membershipType?.endAt.toLocaleDateString()}
                        </p>
                        <p className="text-green-700">
                            <strong>Status:</strong> Active
                        </p>
                    </div>
                    <div className="mt-8">
                        <Button href="/profile" className="mr-4">
                            View Profile
                        </Button>
                        <Button href="/" variant={{ style: "solid" }}>
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
