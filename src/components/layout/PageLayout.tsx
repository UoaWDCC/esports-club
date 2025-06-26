export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="content-container relative min-h-dvh overflow-x-hidden p-8 py-18">
                <main className="flex flex-col gap-y-8">{children}</main>
            </div>
        </>
    );
};
