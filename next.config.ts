import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    env: {
        USE_BACKEND: process.env.USE_BACKEND,
        BACKEND_URL: process.env.BACKEND_URL,
    },
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    {
                        key: "Access-Control-Allow-Origin",
                        value: "http://localhost:3001", // The origin you want to allow
                    },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET, POST, PUT, DELETE, OPTIONS", // Allowed HTTP methods
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-Requested-With, Content-Type, Authorization, Accept", // Allowed request headers
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
