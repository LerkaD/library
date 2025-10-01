import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    generateEtags: false,
    experimental: {
        forceSwcTransforms: true,
    },
    webpack: (config, { isServer }) => {
        config.ignoreWarnings = [
            { module: /node_modules\/bootstrap\/scss\// },
        ];
        return config;
    },
    sassOptions: {
        silenceDeprecations: ['import'],
    },
};

export default nextConfig;