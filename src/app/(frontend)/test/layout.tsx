export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // make test route dev-only
    // will completely disable all pages under `/test`
    if (process.env.NODE_ENV === "production") {
        return null;
    }

    return children;
}
