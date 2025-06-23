import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
