import { PageLayout } from "@/components/layout/PageLayout";
import getAllMembershipsUnpaid from "@/services/membership/getAllMembershipsUnpaid";

import MemberApprovalButton from "./components/memberApprovalButton";

export default async function memberApprovalPage() {
    // Get all unpaid memberships
    const unpaid_memberships = await getAllMembershipsUnpaid();
    return (
        <PageLayout>
            <div className="w-full">
                <table>
                    <tbody>
                        {unpaid_memberships.map((profileData, index) => {
                            const { profile, membership } = profileData;
                            return (
                                <tr key={index}>
                                    <td>{profile.firstName}</td>
                                    <td>{profile.lastName}</td>
                                    <td>
                                        <MemberApprovalButton membershipID={membership.id} />
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
