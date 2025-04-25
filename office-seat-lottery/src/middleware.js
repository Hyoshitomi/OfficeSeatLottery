import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server"; // ← これが必要

export default withAuth(
  function middleware(req) {
    // 認証されていない場合は自動で /login へリダイレクトされるため、通常は何も書かなくてOK
    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/((?!login|api|_next/|favicon.ico|BMClogo_clear.png).*)",
  ],
};
