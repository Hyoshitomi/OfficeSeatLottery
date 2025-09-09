import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaClient } from '@/generated/prisma';

// --- 定数定義 ---

const isTest = process.env.NODE_ENV === 'test';

// --- Prisma Clientのシングルトンインスタンス ---

let prisma;
/**
 * タイトル: getPrisma / PrismaClientインスタンスの取得
 * 要約: PrismaClientのシングルトンインスタンスを返します。インスタンスが存在しない場合は新しく生成します。
 * 補足: 開発環境でのホットリロード時に不要なインスタンスが複数生成されるのを防ぐための一般的なパターンです。
 * @returns {PrismaClient} PrismaClientのインスタンス。
 */
const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
};

// --- 認証ヘルパー関数 ---

/**
 * タイトル: findUserByEmployeeNumber / 社員番号によるユーザー検索
 * 要約: 指定された社員番号に一致するユーザーをデータベースから検索します。
 * @param {string} employeeNumber - 検索対象の社員番号。
 * @param {PrismaClient} prismaClient - PrismaClientのインスタンス。
 * @returns {Promise<import('@/generated/prisma').M_USER | null>} ユーザーオブジェクト。見つからない場合はnull。
 */
const findUserByEmployeeNumber = async (employeeNumber, prismaClient) => {
  return prismaClient.M_USER.findUnique({
    where: { employeeNumber },
  });
};

/**
 * タイトル: verifyPassword / パスワードの検証
 * 要約: 提供されたプレーンテキストのパスワードとハッシュ化されたパスワードを比較検証します。
 * @param {string} password - ユーザーが入力したプレーンテキストのパスワード。
 * @param {string} hashedPassword - データベースに保存されているハッシュ化されたパスワード。
 * @returns {Promise<boolean>} パスワードが一致する場合はtrue、それ以外はfalse。
 */
const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * タイトル: mapToSessionUser / 認証ユーザーオブジェクトの生成
 * 要約: データベースのユーザー情報から、NextAuthがセッションで利用するユーザーオブジェクトを生成します。
 * @param {import('@/generated/prisma').M_USER} dbUser - データベースから取得したユーザーオブジェクト。
 * @returns {object} セッション用のユーザーオブジェクト。
 */
const mapToSessionUser = (dbUser) => ({
  id: dbUser.userId,
  userId: dbUser.userId,
  employeeNumber: dbUser.employeeNumber,
  adminFlag: dbUser.adminFlag,
  lastName: dbUser.lastName,
  firstName: dbUser.firstName,
});

/**
 * タイトル: authorize / 資格情報によるユーザー認証
 * 要約: 提供された社員番号とパスワードを使用してユーザーを認証します。
 * 補足: ユーザー検索、パスワード検証、アカウント状態の確認を行い、成功した場合にセッションで利用するユーザー情報を返します。
 * @param {Record<"employeeNumber" | "password", string> | undefined} credentials - ユーザーから提供された資格情報。
 * @returns {Promise<object | null>} 認証が成功した場合はユーザーオブジェクト、失敗した場合はnull。
 */
const authorize = async (credentials) => {
  if (!credentials?.employeeNumber || !credentials?.password) {
    return null;
  }

  try {
    const prismaClient = getPrisma();
    const user = await findUserByEmployeeNumber(
      credentials.employeeNumber,
      prismaClient,
    );

    if (!user || user.deleteFlag) {
      return null;
    }

    const isValidPassword = await verifyPassword(
      credentials.password,
      user.password,
    );

    if (isValidPassword) {
      return mapToSessionUser(user);
    }

    return null;
  } catch (error) {
    // DB接続エラーなど、予期せぬエラーが発生した場合は認証失敗として扱う
    return null;
  }
};

// --- NextAuth 設定オプション ---

export const authOptions = {
  adapter: isTest ? 'mocked-adapter' : PrismaAdapter(getPrisma()),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        employeeNumber: { label: '社員番号', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    /**
     * タイトル: jwt / JWTトークンの生成・更新
     * 要約: 認証成功時にユーザー情報をJWTに含め、以降のリクエストで利用できるようにします。
     * @param {{token: import('next-auth/jwt').JWT, user: import('next-auth').User}} params - JWTとユーザー情報を含むオブジェクト。
     * @returns {import('next-auth/jwt').JWT} 更新されたJWTオブジェクト。
     */
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          userId: user.userId,
          employeeNumber: user.employeeNumber,
          adminFlag: user.adminFlag,
          lastName: user.lastName,
          firstName: user.firstName,
        };
      }
      return token;
    },

    /**
     * タイトル: session / セッション情報の生成・更新
     * 要約: JWTトークンからセッションオブジェクトに必要なユーザー情報を移し、クライアント側で利用可能にします。
     * @param {{session: import('next-auth').Session, token: import('next-auth/jwt').JWT}} params - セッションとトークン情報を含むオブジェクト。
     * @returns {import('next-auth').Session} 更新されたセッションオブジェクト。
     */
    async session({ session, token }) {
      const newSession = { ...session };
      if (token && newSession.user) {
        newSession.user.userId = token.userId ?? token.sub;
        newSession.user.employeeNumber = token.employeeNumber;
        newSession.user.adminFlag = token.adminFlag;
        newSession.user.lastName = token.lastName;
        newSession.user.firstName = token.firstName;
      }
      return newSession;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
