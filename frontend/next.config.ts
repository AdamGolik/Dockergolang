import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone", // Opcja standalone przydatna przy Dockerze
    eslint: {
        ignoreDuringBuilds: true, // Ignorowanie błędów ESLint podczas budowania
    },
    typescript: {
        ignoreBuildErrors: true, // Ignorowanie błędów TypeScript podczas budowania
    },
    /* tu możesz dodać inne opcje konfiguracji, jeśli są potrzebne */
};

export default nextConfig;
