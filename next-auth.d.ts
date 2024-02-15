import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    userId: string;
    role: string;
    force_signout?: boolean
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}