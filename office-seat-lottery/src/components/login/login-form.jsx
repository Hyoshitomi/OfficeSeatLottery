"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { useState, useCallback } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// バリデーション関数を分離
function validateEmployeeNumber(employeeNumber) {
  if (!employeeNumber || !employeeNumber.match(/^[a-zA-Z0-9]+$/)) {
    toast.error("社員番号は半角英数字のみ入力可能です");
    return false;
  }
  return true;
}

function validatePassword(password) {
  if (!password || !password.match(/^[a-zA-Z0-9!?_$#]+$/)) {
    toast.error("使用可能な文字: 半角英数字と!?_$#");
    return false;
  }
  return true;
}

// 認証処理を分離
async function performAuthentication(employeeNumber, password, callbackUrl) {
  const res = await signIn('credentials', {
    redirect: false,
    employeeNumber,
    password,
    callbackUrl,
  });
  return res;
}

// レスポンス処理を分離
function handleAuthResponse(res) {
  if (res?.error) {
    toast.error("社員番号またはパスワードが正しくありません");
    return;
  }
  
  if (res?.ok) {
    let redirectUrl = res.url || '/';
    if (redirectUrl.startsWith('/login')) {
      redirectUrl = '/';
    }
    window.location.replace(redirectUrl);
  }
}

export function LoginForm({ className, callbackUrl, ...props }) {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // バリデーション
    const isEmployeeNumberValid = validateEmployeeNumber(employeeNumber);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmployeeNumberValid || !isPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await performAuthentication(employeeNumber, password, callbackUrl);
      handleAuthResponse(res);
    } catch (_error) {
      toast.error("認証エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

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
