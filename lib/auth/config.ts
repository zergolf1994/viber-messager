import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/constants/routes';

import { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    providers: [
        // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
        // while this file is also used in non-Node.js environments
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            let isLoggedIn = !!auth?.user;

            const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
            const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
            const isAuthRoute = authRoutes.includes(nextUrl.pathname);

            if (isApiAuthRoute) {
                return true;
            }

            if (isAuthRoute) {
                if (isLoggedIn) {
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
                }
                return true;
            }

            if (!isLoggedIn && !isPublicRoute) {
                let callbackUrl = nextUrl.pathname;
                if (nextUrl.search) {
                    callbackUrl += nextUrl.search;
                }

                const encodedCallbackUrl = encodeURIComponent(callbackUrl);

                return Response.redirect(new URL(
                    `${authRoutes[0]}?callbackUrl=${encodedCallbackUrl}`,
                    nextUrl
                ));
            }

            return true;
        },
    },
    cookies: {
        sessionToken: {
            name: `message_token_key`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        callbackUrl: {
            name: `message_callback`,
            options: {
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `message_csrf`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
    }
} satisfies NextAuthConfig;