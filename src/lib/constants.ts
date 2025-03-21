export const NEXT_PUBLIC_GOOGLE_ID = process.env
  .NEXT_PUBLIC_GOOGLE_ID as string;
export const NEXT_PUBLIC_GOOGLE_SECRET = process.env
  .NEXT_PUBLIC_GOOGLE_SECRET as string;
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET as string;
export const EMAIL_NAME = process.env.NEXT_PUBLIC_EMAIL_NAME as string;
export const SENTRY_ORG = process.env.SENTRY_ORG as string;
export const SENTRY_PROJECT = process.env.SENTRY_PROJECT as string;
export const SENTRY_AUTH_TOKEN = process.env.SENTRY_AUTH_TOKEN as string;
export const NODE_ENV = process.env.NODE_ENV as "production" | "development";
export const UPLOADTHING_TOKEN = process.env.UPLOADTHING_TOKEN as string;
export const UPLOADTHING_SECRET_KEY = process.env
  .UPLOADTHING_SECRET_KEY as string;

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
