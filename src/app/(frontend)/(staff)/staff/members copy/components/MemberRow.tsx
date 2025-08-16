import { MemberList } from "@/app/api/member.all/type";

export function MemberRow({ member, index }: { member: MemberList["members"][0]; index: number }) {
    return (
        <tr>
            <td className="w-min p-2">{index}</td>
            <td>{member.firstName}</td>
            <td>{member.lastName}</td>
            <td>{member.email}</td>
            <td>{member.id}</td>
        </tr>
    );
}
