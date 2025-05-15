"use client";
import { useState, useCallback } from "react";
import Link from 'next/link';

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import { signIn } from "next-auth/react";

export function LoginForm({ className, ...props }) {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // バリデーション
    if (!employeeNumber.match(/^[a-zA-Z0-9]+$/)) {
      setError("社員番号は半角英数字のみ入力可能です");
      setIsLoading(false);
      return;
    }

    if (!password.match(/^[a-zA-Z0-9!?_$#]+$/)) {
      setError("使用可能な文字: 半角英数字と!?_$#");
      setIsLoading(false);
      return;
    }

    try {
      const res = await signIn('credentials', {
        redirect: false,
        employeeNumber,
        password,
        callbackUrl: '/',
      });

      if (res?.error) {
        setError("社員番号またはパスワードが正しくありません");
      } else if (res?.ok) {
        router.push(res.url || '/');
      }
    } catch (err) {
      setError("認証エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  // パスワード表示トグル
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="employeeNumber">社員番号</Label>
                  <Input
                    id="employeeNumber"
                    type="text"
                    placeholder="YY00NN"
                    required
                    value={employeeNumber}
                    onChange={(e) => setEmployeeNumber(e.target.value)}
                    autoComplete="off"
                    pattern="[a-zA-Z0-9]+"
                  />
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      pattern="[a-zA-Z0-9!?_$#]+"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5 text-gray-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>

                {error && <div className="text-sm text-red-500 text-center">{error}</div>}

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "認証中..." : "Login"}
                </Button>
                <Link href="/contact" className="mr-auto text-sm underline-offset-4 hover:underline">
                  管理者に連絡してパスワードをリセット
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
