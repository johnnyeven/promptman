/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    env: {
        API_URL: process.env.API_URL,
        WS_PROXY_URL: process.env.WS_PROXY_URL,
    },
    async rewrites() {
        return [
            {
                source: '/task-scheduler/:path*',
                destination: process.env.API_URL + '/task-scheduler/:path*'
            },
        ]
    },
}

module.exports = nextConfig
