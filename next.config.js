/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: false,
    // images: {
    //     domains: ['imagecache.civitai.com'],
    // },
    env: {
        API_URL: process.env.API_URL,
    },
    async rewrites() {
        return [
            {
                source: '/task-scheduler/:path*',
                destination: process.env.API_URL + '/task-scheduler/:path*'
            }
        ]
    }
}

module.exports = nextConfig
