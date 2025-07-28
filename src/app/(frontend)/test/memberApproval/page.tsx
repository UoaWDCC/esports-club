import { PageLayout } from "@/components/layout/PageLayout";
import getAllMembershipsPending from "@/services/membership/getAllMembershipsPending";

import MemberApprovalButton from "./components/memberApprovalButton";
import MemberRejectionButton from "./components/memberRejectionButton";
import ResetTestMembershipButton from "./components/resetTestMembershipButton";

export default async function memberApprovalPage() {
    // Get all unpaid memberships
    const pending_memberships = await getAllMembershipsPending();
    return (
        <PageLayout>
            <div className="w-full">
                <ResetTestMembershipButton></ResetTestMembershipButton>
                <table>
                    <tbody>
                        {pending_memberships.map((profileData, index) => {
                            const { profile, membership } = profileData;
                            return (
                                <tr key={index}>
                                    <td>{profile.firstName}</td>
                                    <td>{profile.lastName}</td>
                                    <td>
                                        <MemberApprovalButton membershipID={membership.id} />
                                        <MemberRejectionButton
                                            membershipID={membership.id}
                                        ></MemberRejectionButton>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </PageLayout>
    );
}
