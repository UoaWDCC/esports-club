import { MembershipLookupPagination } from "./components/MembershipLookupPagination";
import { MembershipLookupTable } from "./components/MembershipLookupTable";

export default function StaffMemberPage() {
    return (
        <div className="flex grow items-center justify-center">
            <div className="flex w-full flex-col gap-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl">Member Lookup</h1>
                    {/* something else here */}
                </div>
                <MembershipLookupPagination />

                <MembershipLookupTable />
            </div>
        </div>
    );
}
