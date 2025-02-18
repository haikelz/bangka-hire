import {
  NEXT_PUBLIC_GOOGLE_ID,
  NEXT_PUBLIC_GOOGLE_SECRET,
  NEXTAUTH_SECRET,
} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextApiRequest, NextApiResponse } from "next";
import type { Awaitable, NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import { cookies } from "next/headers";

export const options = (
  req?: NextApiRequest,
  res?: NextApiResponse
): NextAuthOptions => {
  return {
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
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      CredentialsProvider({
        name: "Credentials Login",
        credentials: {
          email: {
            label: "Email:",
            type: "text",
            placeholder: "Email...",
          },
          password: {
            label: "Password:",
            type: "password",
            placeholder: "Password....",
          },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const jobApplicant = await db.users.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!jobApplicant) {
            return null;
          }

          const matchPassword = await bcrypt.compare(
            credentials.password,
            jobApplicant.password as string
          );

          if (!matchPassword) {
            return null;
          }

          return {
            id: jobApplicant.id,
            name: jobApplicant.full_name,
            email: jobApplicant.email,
            role: "job_applicant",
            phone_number: jobApplicant.phone_number,
          };
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
            const existingJobApplicant = await db.users.findUnique({
              where: { email: user.email as string },
            });

            const existingJobVacancyProvider = await db.users.findUnique({
              where: { email: user.email as string },
            });

            if (existingJobApplicant) {
              token.id = existingJobApplicant.id;
              token.role = "job_applicant";
            } else if (existingJobVacancyProvider) {
              token.id = existingJobVacancyProvider.id;
              token.role = "job_vacancy_provider";
            }
          }

          return {
            ...token,
            id: user.id,
            email: user.email,
            name: user.name,
            picture: user.image,
            role: user.role || token.role,
          };
        }

        if (trigger === "update" && session?.role) {
          token.role = session.role;
        }

        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.id;
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

          const existingJobApplicant = await db.users.findUnique({
            where: {
              email: user.email as string,
              google_oauth: true,
              role: "job_applicant",
            },
          });
          const existingJobVacancyProvider = await db.users.findUnique({
            where: {
              email: user.email as string,
              google_oauth: true,
              role: "job_vacancy_provider",
            },
          });

          if (existingJobApplicant) {
            user.role = "job_applicant";
            return true;
          } else if (existingJobVacancyProvider) {
            user.role = "job_vacancy_provider";
            return true;
          }

          if (!existingJobApplicant && signUpRole === "job_vacancy") {
            await db.users.create({
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
            return true;
          }

          if (
            !existingJobVacancyProvider &&
            signUpRole === "job_vacancy_provider"
          ) {
            await db.users.create({
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
            return true;
          }
        }
        return true;
      },
    },
  };
};
