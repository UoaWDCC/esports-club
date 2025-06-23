export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    //make test route dev-only
    if (process.env.NODE_ENV === "production") {
        return null;
    }

    return children;
}
