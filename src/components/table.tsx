const Root = ({ children }: { children: React.ReactNode }) => {
    return (
        <table className="bg-border/20 border-border w-full table-fixed border-separate border-spacing-x-px border-spacing-y-px divide-y rounded border text-left">
            {children}
        </table>
    );
};

const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <thead className="bg-opacity-50 text-white">
            <tr className="bg-muted-background whitespace-nowrap *:px-4 *:py-2">{children}</tr>
        </thead>
    );
};

const Body = ({ children }: { children: React.ReactNode }) => {
    return (
        <tbody className="*:bg-background *:hover:bg-cta/5 *:*:px-4 *:*:py-2 *:transition">
            {children}
        </tbody>
    );
};

export const Table = { Root, Heading, Body };
