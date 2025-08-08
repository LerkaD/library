import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    generateEtags: false,
    experimental: {
        forceSwcTransforms: true, // Принудительное использование SWC вместо Babel
    }
};

export default nextConfig;
