import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt({ token, profile }) {
      if (profile?.email) {
        const adminEmails = (process.env.ADMIN_EMAILS ?? "").split(",")
        token.role = adminEmails.includes(profile.email) ? "admin" : "user"
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.role as string
      return session
    },
  },
})
