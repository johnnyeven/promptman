import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_AUTH_ID || '',
            clientSecret: process.env.GITHUB_AUTH_SECRET || '',
            httpOptions: {
                timeout: 60000
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_ID || '',
            clientSecret: process.env.GOOGLE_AUTH_SECRET || '',
            httpOptions: {
                timeout: 60000
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account, profile }) => {
            if (account?.access_token) {
                token.at = account.access_token
            }
            if (account?.providerAccountId) {
                token.id = account.providerAccountId
            }
            console.log(token)
            return token
        },
        session: async ({ session, token, user }) => {
            if (token?.at) {
                session.accessToken = token.at
            }
            if (token?.id) {
                session.id = token.id
            }
            return session
        }
    }
}
export default NextAuth(authOptions)