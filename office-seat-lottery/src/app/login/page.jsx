import Image from 'next/image';
import Link from 'next/link';
import { LoginForm } from "@/components/login/login-form"

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium ">
          <div className="text-primary-foreground flex size-30 items-center justify-center rounded-md">
            <Image src="/BMClogo_clear.png" alt="BMC" width={120} height={120} />
          </div>
        </Link>
        <LoginForm />
      </div>
    </div>
  );
}
