const Root = ({ children }: { children: React.ReactNode }) => {
    return (
        <table className="bg-border/20 border-border border-separate border-spacing-x-px border-spacing-y-px divide-y rounded border text-left">
            {children}
        </table>
    );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className="bg-opacity-50 text-white">
            <tr className="bg-muted-background *:px-4 *:py-2">{children}</tr>
        </thead>
    );
};

const Body = ({ children }: { children: React.ReactNode }) => {
    return <tbody className="*:bg-background">{children}</tbody>;
};

export const Table = { Root, Heading, Body };
