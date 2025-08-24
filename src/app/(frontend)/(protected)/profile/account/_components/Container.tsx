export const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className="bg-muted-background flex flex-col gap-6 rounded-md p-6">{children}</div>;
};