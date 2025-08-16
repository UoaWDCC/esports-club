import { MemberPagination } from "./components/MemberPagination";
import { MemberTable } from "./components/MemberTable";

export default function StaffMemberPage() {
    return (
        <div className="flex grow items-center justify-center">
            <div className="flex w-full flex-col gap-6">
                <div className="flex justify-between">
                    <h1 className="text-4xl">Members</h1>
                    {/* something else here */}
                </div>
                <MemberPagination />
                <MemberTable />
            </div>
        </div>
    );
}
