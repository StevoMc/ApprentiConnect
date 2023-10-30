import { AuthOptions } from "next-auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { logger } from "@/lib/logger";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

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

        const { password: userPassword, ...sanitisedUser } = { ...user };

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
  callbacks: {
    session: ({ session, token }) => {
      // console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          name: token.firstname + " " + token.lastname,
          image: token.picture,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          name: u.firstname + " " + u.lastname,
        };
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
};

export default authOptions;
