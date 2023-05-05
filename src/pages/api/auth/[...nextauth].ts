import NextAuth, { Account, Profile, User, SessionStrategy } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { JWT } from "next-auth/jwt"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()
const JWTStrategy: SessionStrategy = "jwt"
export const authOptions = {
    secret: process.env.JWT_SECRET,
    session: {
        strategy: JWTStrategy,
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_AUTH_HOST,
                port: Number(process.env.EMAIL_AUTH_PORT),
                secure: true,
                auth: {
                    user: process.env.EMAIL_AUTH_USER,
                    pass: process.env.EMAIL_AUTH_PASSWORD,
                },
            },
            from: process.env.EMAIL_AUTH_FROM,
        }),
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
        jwt: async (props: { token: JWT, account: Account | null, profile?: Profile }) => {
            const { token, account, profile } = props
            if (account?.access_token) {
                token.at = account.access_token
            }
            if (account?.providerAccountId) {
                token.id = account.providerAccountId
            }
            return token
        },
        session: async (props: { session: any, token: JWT, user: User }) => {
            const { session, token, user } = props
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