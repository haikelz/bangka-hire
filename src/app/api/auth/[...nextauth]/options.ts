import {
  NEXT_PUBLIC_GOOGLE_ID,
  NEXT_PUBLIC_GOOGLE_SECRET,
  NEXTAUTH_SECRET,
} from "@/lib/constants";
import db from "@/lib/db";
import type { Awaitable, NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { cookies } from "next/headers";

interface UserGoogle extends User {
  google_oauth: boolean;
}

export const options: NextAuthOptions = {
  theme: {
    colorScheme: "auto",
  },
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile): Awaitable<UserGoogle> {
        return {
          ...profile,
          role: profile.role,
          name: profile.name,
          google_oauth: true,
          id: profile.sub,
          image: profile.picture,
        };
      },
      clientId: NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: NEXT_PUBLIC_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
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
    async jwt({ token, user, account, trigger, session }) {
      if (account && user) {
        if (account.provider === "google") {
          const existingJobApplicant = await db.user.findUnique({
            where: { email: user.email as string },
          });

          const existingJobVacancyProvider = await db.user.findUnique({
            where: { email: user.email as string },
          });

          if (existingJobApplicant) {
            token.id = existingJobApplicant.id;
            token.google_oauth = existingJobApplicant.google_oauth;
            token.description = existingJobApplicant.description;
            token.role = existingJobApplicant.role;
          } else if (existingJobVacancyProvider) {
            token.id = existingJobVacancyProvider.id;
            token.description = existingJobVacancyProvider.description;
            token.google_oauth = existingJobVacancyProvider.google_oauth;
            token.role = existingJobVacancyProvider.role;
          }
        }

        return {
          ...token,
          id: token.id,
          email: user.email,
          google_oauth: true,
          description: token.description,
          name: user.name,
          image: user.image,
          role: user.role || token.role,
        };
      }

      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.google_oauth = true;
        session.user.description = token.description;
        session.user.role = token.role;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async signIn({ account, user }) {
      if (account?.provider === "google") {
        if (!user.email) {
          return false;
        }

        const signUpRole = (await cookies()).get("sign-up-role")?.value;

        const existingJobApplicant = await db.user.findUnique({
          where: {
            email: user.email as string,
            google_oauth: true,
            role: "job_applicant",
          },
        });
        const existingJobVacancyProvider = await db.user.findUnique({
          where: {
            email: user.email as string,
            google_oauth: true,
            role: "job_vacancy_provider",
          },
        });

        if (existingJobApplicant && signUpRole === "job_applicant") {
          return false;
        } else if (
          existingJobVacancyProvider &&
          signUpRole === "job_vacancy_provider"
        ) {
          return false;
        }

        if (!existingJobApplicant && signUpRole === "job_applicant") {
          await db.user.create({
            data: {
              email: user.email as string,
              full_name: user.name as string,
              password: "",
              phone_number: "",
              image: user.image as string,
              role: "job_applicant",
              google_oauth: true,
            },
          });
        }

        if (
          !existingJobVacancyProvider &&
          signUpRole === "job_vacancy_provider"
        ) {
          await db.user.create({
            data: {
              email: user.email as string,
              full_name: user.name as string,
              password: "",
              phone_number: "",
              image: user.image as string,
              role: "job_vacancy_provider",
              google_oauth: true,
            },
          });
        }
      }
      (await cookies()).delete("sign-up-role");
      return true;
    },
  },
};

export default NextAuth(options);
