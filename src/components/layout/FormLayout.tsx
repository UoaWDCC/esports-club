import { ReactNode } from "react";

export function FormLayout({ children }: { children: ReactNode }) {
    return (
        <div className="grid min-h-screen grid-cols-5">
            <div className="col-span-3 flex items-center justify-center">{children}</div>
            <div className="col-span-2 flex items-center justify-center bg-neutral-800">
                <div className="p-8 text-center">
                    <h2 className="text-2xl font-semibold">Auckland University Esports Club</h2>
                </div>
            </div>
        </div>
    );
}
