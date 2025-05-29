"use client";

import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from "@/components/login/login-form";
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  let callbackUrl = searchParams.get('callbackUrl') || '/';

  // callbackUrlが/loginまたは/login?xxxの場合はトップページに変更
  if (callbackUrl.startsWith('/login')) {
    callbackUrl = '/';
  }

  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 self-center font-medium ">
            <div className="text-primary-foreground flex size-30 items-center justify-center rounded-md">
              <Image src="/BMClogo_clear.png" alt="BMC" width={120} height={120} />
            </div>
          </Link>
          <LoginForm callbackUrl={callbackUrl}/>
        </div>
      </div>
    </Suspense>
  );
}
