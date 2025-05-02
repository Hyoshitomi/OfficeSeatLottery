import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        employeeNumber: { label: "社員番号", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const user = await prisma.user.findUnique({
            where: { employeeNumber: credentials.employeeNumber },
          });
          if (
            user &&
            !user.isDeleted &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return {
              id: user.id,
              employeeNumber: user.employeeNumber,
              isAdmin: user.isAdmin,
              lastName: user.lastName,
            };
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub;
        session.user.employeeNumber = token.employeeNumber;
        session.user.isAdmin = token.isAdmin;
        session.user.lastName = token.lastName;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.employeeNumber = user.employeeNumber;
        token.isAdmin = user.isAdmin;
        token.lastName = user.lastName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
