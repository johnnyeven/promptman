/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'standalone',
    env: {
        API_URL: process.env.API_URL,
        WS_PROXY_URL: process.env.WS_PROXY_URL,
        GITHUB_AUTH_ID: process.env.GITHUB_AUTH_ID,
        GITHUB_AUTH_SECRET: process.env.GITHUB_AUTH_SECRET,
        GOOGLE_AUTH_ID: process.env.GOOGLE_AUTH_ID,
        GOOGLE_AUTH_SECRET: process.env.GOOGLE_AUTH_SECRET,
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
