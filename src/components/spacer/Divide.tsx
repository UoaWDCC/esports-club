export const Divide = ({ text }: { text: string }) => {
    return (
        <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-neutral-400" />
            <span className="text-sm text-neutral-400">{text}</span>
            <div className="h-px flex-1 bg-neutral-400" />
        </div>
    );
};
