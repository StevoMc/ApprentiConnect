import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { logger } from "@/lib/logger";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const body = Object.entries(credentials || {})
          .map((e) => e.join("="))
          .join("&") as string;

        console.log(body);

        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.username,
            password: credentials?.password,
          },
        });

        console.log(user);
        if (user && user.password === credentials?.password) {
          return user;
        } else {
          return null;
        }

        // const user = await fetch(
        //   `${process.env.NEXTAUTH_URL}/api/user/check-credentials`,
        //   {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/x-www-form-urlencoded",
        //       accept: "application/json",
        //     },
        //     body,
        //   },
        // )
        //   .then((res) => res.json())
        //   .catch((err) => {
        //     return null;
        //   });
      },
    }),
  ],
  // pages
  pages: {
    signIn: "/auth/signin",
    // signOut: "/auth/signout",
  },
  secret: process.env.SECRET,
  logger: {
    error: (code, metadata) => {
      logger.error(code, metadata);
    },
    warn: (code) => {
      logger.warn(code);
    },
    debug: (code, metadata) => {
      logger.debug(code, metadata);
    },
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
