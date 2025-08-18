import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className="content-container relative min-h-dvh overflow-x-hidden">
                <Navbar />
                <main className="flex flex-col gap-y-8 py-18">
                    {children}
                    <Footer />
                </main>
            </div>
        </>
    );
};
