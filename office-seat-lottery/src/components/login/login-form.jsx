// login-form.jsx
'use client';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

/**
 * タイトル: validateEmployeeNumber / 社員番号のバリデーション
 * 要約: 社員番号が半角英数字のみで構成されているかを検証します。
 * 補足: 不正な場合はトーストでエラーメッセージを表示します。
 * @param {string} employeeNumber - 入力された社員番号。
 * @returns {boolean} 検証に合格すればtrue、失敗すればfalse。
 */
function validateEmployeeNumber(employeeNumber) {
  if (!employeeNumber || !employeeNumber.match(/^[a-zA-Z0-9]+$/)) {
    toast.error('社員番号は半角英数字のみ入力可能です');
    return false;
  }
  return true;
}

/**
 * タイトル: validatePassword / パスワードのバリデーション
 * 要約: パスワードが許可された文字種で構成されているかを検証します。
 * 補足: 使用可能な文字は半角英数字と!?_$#に限定します。不正な場合はトーストで通知します。
 * @param {string} password - 入力されたパスワード。
 * @returns {boolean} 検証に合格すればtrue、失敗すればfalse。
 */
function validatePassword(password) {
  if (!password || !password.match(/^[a-zA-Z0-9!?_$#]+$/)) {
    toast.error('使用可能な文字: 半角英数字と!?_$#');
    return false;
  }
  return true;
}

/**
 * タイトル: performAuthentication / 認証リクエストの実行
 * 要約: next-authのCredentialsプロバイダでサインイン処理を行います。
 * 補足: 画面遷移は行わず、レスポンスを返します（redirect: false）。
 * @param {string} employeeNumber - 社員番号。
 * @param {string} password - パスワード。
 * @param {string | undefined} callbackUrl - 認証後のリダイレクト先URL。
 * @returns {Promise<{ok?: boolean, error?: string, url?: string} | undefined>} signInのレスポンス。
 */
async function performAuthentication(employeeNumber, password, callbackUrl) {
  const res = await signIn('credentials', {
    redirect: false,
    employeeNumber,
    password,
    callbackUrl,
  });
  return res;
}

/**
 * タイトル: handleAuthResponse / 認証レスポンス処理
 * 要約: 認証結果に応じてエラー表示またはリダイレクトを実施します。
 * 補足: /login配下に戻るURLの場合はトップへ置き換えます。
 * @param {{ok?: boolean, error?: string, url?: string} | undefined} res - signInからのレスポンス。
 * @returns {void}
 */
function handleAuthResponse(res) {
  if (res?.error) {
    toast.error('社員番号またはパスワードが正しくありません');
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

/**
 * タイトル: LoginForm / ログインフォーム
 * 要約: 社員番号とパスワードで認証するフォームコンポーネントです。
 * 補足: バリデーション、認証、結果に応じたリダイレクトを一連で実施します。
 * @param {{ className?: string, callbackUrl?: string }} props - 表示クラスとコールバックURL。
 * @returns {import('react').ReactElement} ログインフォーム。
 */
export function LoginForm({ className, callbackUrl, ...props }) {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * タイトル: handleSubmit / フォーム送信ハンドラ
   * 要約: 入力値のバリデーション後、認証処理を実行します。
   * @param {import('react').FormEvent<HTMLFormElement>} e - フォーム送信イベント。
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const isEmployeeNumberValid = validateEmployeeNumber(employeeNumber);
    const isPasswordValid = validatePassword(password);
    if (!isEmployeeNumberValid || !isPasswordValid) {
      setIsLoading(false);
      return;
    }

    try {
      const res = await performAuthentication(
        employeeNumber,
        password,
        callbackUrl,
      );
      handleAuthResponse(res);
    } catch (_error) {
      toast.error('認証エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * タイトル: togglePasswordVisibility / パスワード表示切り替え
   * 要約: パスワードの表示/非表示をトグルします。
   * @returns {void}
   */
  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <Card className={cn('w-full max-w-md', className)} {...props}>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
        <CardDescription>
          社員番号とパスワードを入力してログインしてください
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="employeeNumber">社員番号</Label>
            <Input
              id="employeeNumber"
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              placeholder="社員番号を入力"
              autoComplete="username"
              inputMode="text"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">パスワード</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワードを入力"
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'パスワードを非表示' : 'パスワードを表示'}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? '認証中...' : 'ログイン'}
          </Button>
          <Link href="/contact" className="mr-auto text-sm underline-offset-4 hover:underline">
            管理者に連絡してパスワードをリセット
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
