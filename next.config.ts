import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // lint and type errors are not enforced during the production build
    // (matches the previous Fly `next build --experimental-build-mode compile` behaviour)
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    redirects: async () => {
        if (process.env.NODE_ENV !== "development") {
            return [
                // disable test api route in production
                {
                    source: "/api/tests/:slug*",
                    destination: "/404",
                    permanent: true,
                },
            ];
        } else {
            return [];
        }
    },
};

export default nextConfig;
