/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    env: {
        API_URL: process.env.API_URL,
        WS_PROXY_URL: process.env.WS_PROXY_URL,
    },
    i18n,
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
