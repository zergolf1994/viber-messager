import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './config';
import { getAuthById } from '@/data/auth.data';

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    callbacks: {
        async signIn({ user, account }) {
            // Allow OAuth without email verification
            if (account?.provider !== "credentials") return true;
            return true;
        },
        async session({ token, session }) {


            if (token.userId && session.user) {
                session.user.userId = token.userId as string;
            }

            if (token.role && session.user) {
                session.user.role = token.role as string;
            }
            if (!token.enable) {
                session.user.force_signout = true;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;
            let auths = await getAuthById(token.sub);

            if (!auths) {
                token.enable = false;
                return token;
            }

            token.userId = auths?.userId;
            token.enable = auths?.user.enable || false;
            token.name = auths?.user.name;
            token.email = auths?.user.email;
            token.role = auths?.user.role;

            return token;
        }
    },
    providers: [
        Credentials({
            async authorize({ id }: any) {

                let auths = await getAuthById(id);
                if (!auths) return null;

                return {
                    id: auths?.id,
                    role: auths?.user?.role,
                    name: auths?.user?.name,
                    email: auths?.user?.email,
                    image: auths?.user?.image,
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
});