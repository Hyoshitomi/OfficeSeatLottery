import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@/generated/prisma";

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
          const user = await prisma.M_USER.findUnique({
            where: { employeeNumber: credentials.employeeNumber },
          });
          console.log("user:", user);
          if (
            user &&
            !user.deleteFlag &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            return {
              userId: user.userId,
              employeeNumber: user.employeeNumber,
              adminFlag: user.adminFlag,
              lastName: user.lastName,
              firstName: user.firstName,
            };
          }
          return null;
        } catch (_error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token) {
        session.user.userId = token.userId || token.sub;
        session.user.employeeNumber = token.employeeNumber;
        session.user.adminFlag = token.adminFlag;
        session.user.lastName = token.lastName;
        session.user.firstName = token.firstName;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId; 
        token.employeeNumber = user.employeeNumber;
        token.adminFlag = user.adminFlag;
        token.lastName = user.lastName;
        token.firstName = user.firstName;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
