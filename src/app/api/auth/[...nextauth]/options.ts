import { NEXT_PUBLIC_GOOGLE_ID, NEXT_PUBLIC_GOOGLE_SECRET, NEXTAUTH_SECRET } from "@/lib/constants";
import type { Awaitable, DefaultSession, NextAuthOptions, User as NextAuthUser } from "next-auth";
import { JWT } from "next-auth/jwt";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
interface User extends NextAuthUser {
  role?: string;
}

// interface untuk session user
interface ISession extends DefaultSession {
  user?: {
    id?: string;
    role?: string;
  } & DefaultSession["user"]
}

export const options: NextAuthOptions = {
  theme: {
    colorScheme: "auto",
  },
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile): Awaitable<User> {
        return {
          ...profile,
          role: profile.role,
          name: profile.name,
          id: profile.sub,
          image: profile.picture,
        };
      },
      clientId: NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  callbacks: {
    async jwt({ token, user } : { token: JWT; user : User }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token } : { session : ISession; token: JWT }) {
      if (session?.user) session.user.role = token.role as string | undefined;
      return session;
    },
  },
};
