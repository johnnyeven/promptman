/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['imagecache.civitai.com'],
    },
    env: {
        API_URL: process.env.API_URL,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: process.env.API_URL + '/api/:path*'
            }
        ]
    }
}

module.exports = nextConfig
