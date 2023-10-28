import { AuthOptions } from "next-auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { logger } from "@/lib/logger";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const { email, password } = credentials ?? {};
        if (!email || !password) {
          // throw new Error("Missing username or password");
          return null;
        }

        const body = Object.entries(credentials || {})
          .map((e) => e.join("="))
          .join("&") as string;

        const emailLower = email.toLowerCase();
        console.log(emailLower);

        const user = await prisma?.user.findFirst({
          where: {
            email: emailLower,
          },
        });
        if (!user?.password) {
          throw new Error("Invalid username or password");
        }

        try {
          const correct = await compare(password, user.password ?? "");

          if (!correct) {
            throw new Error("Invalid username or password");
          }
        } catch (e) {
          console.error(e);
          return null;
        }
        return user;
      },
    }),
  ],
  // pages
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
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
  // jwt: {
  //   async encode({ secret, token }) {
  //     return jwt.sign({ token }, secret);
  //   },
  //   async decode({ secret, token }) {
  //     return jwt.verify(token, secret);
  //   },
  // },
};

export default authOptions;
