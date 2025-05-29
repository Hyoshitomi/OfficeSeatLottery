import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  // 認証済みで /login にアクセスした場合はトップページへリダイレクト
  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 未認証で /login 以外にアクセスした場合はログイン画面へ
  if (
    !isAuthenticated &&
    !req.nextUrl.pathname.startsWith("/login") &&
    !req.nextUrl.pathname.startsWith("/contact")
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // それ以外は通常通り
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|.*\\.png$).*)",
  ],
};
