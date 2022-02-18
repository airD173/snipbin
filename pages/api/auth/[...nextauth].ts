import NextAuth, { DefaultProfile } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GitlabProvider from 'next-auth/providers/gitlab'
import prisma from '@lib/prisma'
import { nanoid } from 'nanoid'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      // @ts-ignore
      scope: 'read:user',
    }),
    GitlabProvider({
      clientId: process.env.GITLAB_ID,
      clientSecret: process.env.GITLAB_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.SECRET,
  },
  pages: {
    signIn: '/',
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: profile.email!,
        },
      })

      if (!existingUser) {
        try {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: profile.name,
              api: nanoid(20),
            },
          })
        } catch (error) {
          console.log(error)
          return false
        }
      }

      return true
    },
    // async redirect({ url, baseUrl }) { return baseUrl },
    async session({ session, token, user }) {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
      })

      session.user!.name = currentUser!.id.toString()

      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      const currentUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      })

      token.sub = currentUser!.api

      return token
    },
  },
  events: {},
  debug: true,
})
