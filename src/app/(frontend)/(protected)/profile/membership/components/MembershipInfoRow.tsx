interface MembershipInfoRowProps {
    title: string;
    info: string;
}

export function MembershipInfoRow({title, info} : MembershipInfoRowProps) {
    return (
        <div className="flex flex-row justify-between">
            <p> {title}: </p>
            <p> {info} </p>
        </div>
    );
}