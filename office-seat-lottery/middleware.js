import { NextResponse } from 'next/server';

const PUBLIC_PATHS = [
  '/login',
  '/api/auth',
  '/favicon.ico',
  '/_next/static',
  '/_next/image',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // PUBLIC_PATHSに該当する場合はミドルウェアをスルー
  if (PUBLIC_PATHS.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }

  // NextAuthのセッショントークンを取得
  const token =
    request.cookies.get('next-auth.session-token')?.value ||
    request.cookies.get('__Secure-next-auth.session-token')?.value;

  console.log('Cookie Token:', token);

  if (!token) {
    // 未認証ならログインページへリダイレクト
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 認証済みならそのまま
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
