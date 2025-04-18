const StandardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="relative min-h-dvh overflow-x-hidden p-8 py-18">
                <main className="content-container gap-y-8">{children}</main>
            </div>
        </>
    );
};

export default StandardLayout;
