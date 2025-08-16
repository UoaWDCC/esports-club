import { MemberList } from "@/app/api/member.all/type";

export const MemberTableHeading = () => (
    <>
        {/* <th className="w-4"></th> */}
        <th className="w-1/3">First name</th>
        <th className="w-1/3">Last name</th>
        <th className="w-full">Email</th>
        <th className="w-1/5">Id</th>
    </>
);

export function MemberRow({ member, index }: { member: MemberList["members"][0]; index: number }) {
    return (
        <tr className="*:truncate">
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.email}</td>
            <td>{member.id}</td>
        </tr>
    );
}
