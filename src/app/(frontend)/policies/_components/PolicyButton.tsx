import Link from "next/link";

interface PolicyButtonProps {
    title: string;
    policy: string;
    link: string;
}

export function PolicyButton({ title, policy, link }: PolicyButtonProps) {
    return (
        <div className="flex w-fit flex-col gap-6 rounded-lg border-2 border-[#978FFE] p-6 text-xl">
            <p className="leading-none">{title}</p>
            <p className="leading-none text-[#AFAFAF]">
                Our {policy}.
                <br />
                Last updated on December 19, 2024.
            </p>
            <Link className="text-md w-[340px] text-[#978FFE] hover:underline" href={link}>
                View
            </Link>
        </div>
    );
}
