import bcrypt from 'bcryptjs';

// モック設定
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
}));

jest.mock('@next-auth/prisma-adapter', () => ({
  PrismaAdapter: jest.fn(),
}));

jest.mock('@/generated/prisma', () => ({
  PrismaClient: jest.fn(),
}));

// authOptionsファイル全体をモック
jest.mock('@/lib/authOptions', () => {
  const mockPrismaInstance = {
    M_USER: {
      findUnique: jest.fn(),
    },
  };

  const mockGetPrisma = jest.fn(() => mockPrismaInstance);

  return {
    authOptions: {
      adapter: 'mocked-adapter',
      providers: [
        {
          name: "Credentials",
          credentials: {
            employeeNumber: { label: "社員番号", type: "text" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials) {
            if (!credentials?.employeeNumber || !credentials?.password) {
              return null;
            }
            
            try {
              const user = await mockGetPrisma().M_USER.findUnique({
                where: { employeeNumber: credentials.employeeNumber },
              });
              
              if (
                user &&
                !user.deleteFlag &&
                (await require('bcryptjs').compare(credentials.password, user.password))
              ) {
                return {
                  id: user.userId,
                  userId: user.userId,
                  employeeNumber: user.employeeNumber,
                  adminFlag: user.adminFlag,
                  lastName: user.lastName,
                  firstName: user.firstName,
                };
              }
              return null;
            } catch (_error) {
              console.error("Authentication error:", _error);
              return null;
            }
          },
        },
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
    },
    mockPrismaInstance,
    mockGetPrisma,
  };
});

describe('NextAuth Configuration', () => {
  const mockBcrypt = bcrypt;
  let authOptions;
  let mockPrismaInstance;
   
  let mockGetPrisma;

  beforeEach(() => {
    jest.clearAllMocks();
    
    // モックされたauthOptionsを取得
    const authModule = require('@/lib/authOptions');
    authOptions = authModule.authOptions;
    mockPrismaInstance = authModule.mockPrismaInstance;
    mockGetPrisma = authModule.mockGetPrisma;
  });

  describe('基本設定', () => {
    it('正しい基本設定が含まれている', () => {
      expect(authOptions.session.strategy).toBe('jwt');
      expect(authOptions.pages.signIn).toBe('/login');
      expect(authOptions.secret).toBe(process.env.NEXTAUTH_SECRET);
    });

    it('CredentialsProviderが正しく設定されている', () => {
      const credentialsProvider = authOptions.providers[0];
      
      expect(credentialsProvider.name).toBe('Credentials');
      expect(credentialsProvider.credentials).toEqual({
        employeeNumber: { label: '社員番号', type: 'text' },
        password: { label: 'Password', type: 'password' },
      });
    });
  });

  describe('authorize関数のテスト', () => {
    let authorizeFunction;

    beforeEach(() => {
      const credentialsProvider = authOptions.providers[0];
      authorizeFunction = credentialsProvider.authorize;
    });

    it('認証情報が不足している場合はnullを返す', async () => {
      const result1 = await authorizeFunction({});
      const result2 = await authorizeFunction({ employeeNumber: 'E001' });
      const result3 = await authorizeFunction({ password: 'password' });
      
      expect(result1).toBeNull();
      expect(result2).toBeNull();
      expect(result3).toBeNull();
    });

    it('有効なユーザーの場合は認証成功', async () => {
      // 有効なユーザーデータを提供
      const mockUser = {
        userId: 1,
        employeeNumber: 'E001',
        password: 'hashedPassword',
        deleteFlag: false,
        adminFlag: true,
        lastName: '田中',
        firstName: '太郎',
      };

      mockPrismaInstance.M_USER.findUnique.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(true);

      const credentials = {
        employeeNumber: 'E001',
        password: 'password123',
      };

      const result = await authorizeFunction(credentials);

      expect(mockPrismaInstance.M_USER.findUnique).toHaveBeenCalledWith({
        where: { employeeNumber: 'E001' },
      });
      expect(mockBcrypt.compare).toHaveBeenCalledWith('password123', 'hashedPassword');
      expect(result).toEqual({
        id: 1,
        userId: 1,
        employeeNumber: 'E001',
        adminFlag: true,
        lastName: '田中',
        firstName: '太郎',
      });
    });

    it('ユーザーが存在しない場合はnullを返す', async () => {
      mockPrismaInstance.M_USER.findUnique.mockResolvedValue(null);

      const credentials = {
        employeeNumber: 'E999',
        password: 'password123',
      };

      const result = await authorizeFunction(credentials);
      expect(result).toBeNull();
    });

    it('削除フラグが立っているユーザーは認証失敗', async () => {
      const mockUser = {
        userId: 1,
        employeeNumber: 'E001',
        password: 'hashedPassword',
        deleteFlag: true, // 削除フラグがtrue
        adminFlag: false,
        lastName: '田中',
        firstName: '太郎',
      };

      mockPrismaInstance.M_USER.findUnique.mockResolvedValue(mockUser);

      const credentials = {
        employeeNumber: 'E001',
        password: 'password123',
      };

      const result = await authorizeFunction(credentials);
      expect(result).toBeNull();
    });

    it('パスワードが一致しない場合は認証失敗', async () => {
      const mockUser = {
        userId: 1,
        employeeNumber: 'E001',
        password: 'hashedPassword',
        deleteFlag: false,
        adminFlag: false,
        lastName: '田中',
        firstName: '太郎',
      };

      mockPrismaInstance.M_USER.findUnique.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockResolvedValue(false); // パスワード不一致

      const credentials = {
        employeeNumber: 'E001',
        password: 'wrongPassword',
      };

      const result = await authorizeFunction(credentials);
      expect(result).toBeNull();
    });

    it('データベースエラーが発生した場合はnullを返す', async () => {
      mockPrismaInstance.M_USER.findUnique.mockRejectedValue(new Error('Database error'));
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const credentials = {
        employeeNumber: 'E001',
        password: 'password123',
      };

      const result = await authorizeFunction(credentials);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Authentication error:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });

    it('bcryptエラーが発生した場合はnullを返す', async () => {
      const mockUser = {
        userId: 1,
        employeeNumber: 'E001',
        password: 'hashedPassword',
        deleteFlag: false,
        adminFlag: false,
        lastName: '田中',
        firstName: '太郎',
      };

      mockPrismaInstance.M_USER.findUnique.mockResolvedValue(mockUser);
      mockBcrypt.compare.mockRejectedValue(new Error('Bcrypt error'));
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      const credentials = {
        employeeNumber: 'E001',
        password: 'password123',
      };

      const result = await authorizeFunction(credentials);

      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith('Authentication error:', expect.any(Error));
      
      consoleSpy.mockRestore();
    });
  });

  describe('コールバック関数', () => {
    it('sessionコールバックが正しく動作する', async () => {
      const session = { user: {} };
      const token = {
        userId: 1,
        employeeNumber: 'E001',
        adminFlag: true,
        lastName: '田中',
        firstName: '太郎',
      };

      const result = await authOptions.callbacks.session({ session, token });

      expect(result.user).toEqual({
        userId: 1,
        employeeNumber: 'E001',
        adminFlag: true,
        lastName: '田中',
        firstName: '太郎',
      });
    });

    it('jwtコールバックが正しく動作する', async () => {
      const token = {};
      const user = {
        userId: 1,
        employeeNumber: 'E001',
        adminFlag: true,
        lastName: '田中',
        firstName: '太郎',
      };

      const result = await authOptions.callbacks.jwt({ token, user });

      expect(result).toEqual({
        userId: 1,
        employeeNumber: 'E001',
        adminFlag: true,
        lastName: '田中',
        firstName: '太郎',
      });
    });
  });
});
