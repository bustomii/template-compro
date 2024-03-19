import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/prisma/client";
import Adapters from "next-auth/adapters";
import bcrypt from "bcrypt";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const users = await CheckUser(email);
        if (!users) {
          throw new Error("invalid credentials");
        }

        const passwordMatches = await bcrypt.compare(password, users.password);
        if (!passwordMatches) {
          throw new Error("invalid credentials");
        }

        const roles = await prisma.user_roles.findMany({
          where: {
            userId: users.id,
          },
          include: {
            role: true,
          },
        });

        let user = {
          id: users.id.toString(),
          email: users.email,
          name: users.name,
          roles: roles,
        };

        return user;
      },
    }),
  ],
  pages: {
    signIn: "login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          user: user,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: token?.user ?? session?.user,
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handle = NextAuth(authOptions);

export { handle as GET, handle as POST };

const CheckUser = async (email: string) => {
  // users with role admin can access this route
  const users = await prisma.users.findUnique({
    where: {
      email: email,
    },
  });

  return users;
};
