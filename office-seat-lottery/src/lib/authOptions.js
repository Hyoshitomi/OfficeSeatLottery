const { PrismaAdapter } = require("@next-auth/prisma-adapter");
const CredentialsProvider = require("next-auth/providers/credentials").default;
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const authOptions = {
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
          };
        }
        return null;
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
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.employeeNumber = user.employeeNumber;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

module.exports = { authOptions };
