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

          const jobApplicant = await db.job_applicant.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!jobApplicant) {
            return null;
          }

          const matchPassword = await bcrypt.compare(
            credentials.password,
            jobApplicant.password
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
            const existingJobApplicant = await db.job_applicant.findUnique({
              where: { email: user.email as string },
            });

            const existingJobVacancyProvider =
              await db.job_vacancy_provider.findUnique({
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
        }
        return session;
      },
      async signIn({ account, user }) {
        if (account?.provider === "google") {
          if (!user.email) {
            return false;
          }

          const url = new URL(req?.url || "");
          const signUpUrl = url.searchParams.get("sign-up-url");

          const existingJobApplicant = await db.job_applicant.findUnique({
            where: { email: user.email as string },
          });
          const existingJobVacancyProvider =
            await db.job_vacancy_provider.findUnique({
              where: { email: user.email as string },
            });

          if (signUpUrl && !existingJobApplicant) {
            /*await db.job_applicant.create({
              data: {
                email: user.email as string,
                full_name: user.name as string,
                password: "",
                phone_number: "",
                image: user.image as string,
              },
            });*/

            return true;
          } else if (signUpUrl === "/auth/sign-up" && !existingJobApplicant) {
            return false;
          }

          if (
            (req?.url as string) === "/auth/job-vacancy-provider/sign-up" &&
            !existingJobVacancyProvider
          ) {
            /*await db.job_vacancy_provider.create({
              data: {
                email: user.email as string,
                full_name: user.name as string,
                password: "",
                phone_number: "",
                image: user.image as string,
              },
            });*/

            return true;
          } else if (
            (req?.url as string) === "/auth/job-vacancy-provider/sign-up" &&
            !existingJobVacancyProvider
          ) {
            return false;
          }

          if (existingJobApplicant) {
            user.role = "job_applicant";
          } else if (existingJobVacancyProvider) {
            user.role = "job_vacancy_provider";
          }
        }
        return true;
      },
    },
  };
};
