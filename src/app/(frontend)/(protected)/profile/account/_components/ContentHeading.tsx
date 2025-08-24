export const ContentHeading = ({ title, description }: { title: string; description: string }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3>{title}</h3>
            <p className="text-muted">{description}</p>
        </div>
    );
};