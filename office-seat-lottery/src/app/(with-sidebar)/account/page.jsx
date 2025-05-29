"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Camera, Eye, EyeOff, Check, X } from "lucide-react"
import { useSession } from "next-auth/react";

export default function MyPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [validationAttempted, setValidationAttempted] = useState(false)
  const { data: session } = useSession();
  const user = session?.user;
  
  const [formData, setFormData] = useState({
    name: `${user?.lastName} ${user?.firstName}` ?? "取得失敗",
    employeeId: user?.employeeNumber ?? "取得失敗",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [profileImage, setProfileImage] = useState(`/avatars/${user?.employeeNumber}.png`)

  // パスワード要件チェック関数を更新
  const checkPasswordRequirements = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!?_$#]/.test(password),
    }
  }

  const passwordRequirements = checkPasswordRequirements(formData.newPassword)
  const allRequirementsMet = Object.values(passwordRequirements).every((req) => req)

  const handleInputChange = (field, value) => {
    // 名前と社員番号は変更不可
    if (field === "name" || field === "employeeId") {
      return
    }

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = async () => {
    setValidationAttempted(true)

    // パスワード変更がある場合のバリデーション
    if (formData.newPassword) {
      // パスワード要件チェック
      if (!allRequirementsMet) {
        alert("パスワードが要件を満たしていません")
        return
      }

      // パスワード確認チェック
      if (formData.newPassword !== formData.confirmPassword) {
        alert("新しいパスワードと確認用パスワードが一致しません")
        return
      }

      // 現在のパスワードが入力されているかチェック
      if (!formData.currentPassword) {
        alert("現在のパスワードを入力してください")
        return
      }
    }

    // パスワード変更がある場合のみAPIを呼び出す
    if (formData.newPassword) {
      // ここでAPIを呼び出す
      try {
        const res = await fetch("/api/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        });

        const data = await res.json();

        if (res.ok) {
          alert("パスワードが変更されました");
          setFormData((prev) => ({
            ...prev,
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }));
          setValidationAttempted(false);
        } else {
          alert(data.error || "パスワード変更に失敗しました");
        }
      } catch (error) {
        alert("通信エラーが発生しました");
      }
      return;
    }

  alert("プロフィールが更新されました")
    setValidationAttempted(false)
  }

  const getRequirementColor = (isValid) => {
    if (!validationAttempted && !formData.newPassword) {
      return "text-gray-500"
    }
    if (validationAttempted && !isValid) {
      return "text-red-500"
    }
    if (isValid) {
      return "text-green-500"
    }
    return "text-gray-500"
  }

  const getRequirementIcon = (isValid) => {
    if (isValid) {
      return <Check className="h-4 w-4 text-green-500" />
    }
    if (validationAttempted && !isValid) {
      return <X className="h-4 w-4 text-red-500" />
    }
    return <div className="h-4 w-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">マイページ</h1>
          <p className="text-gray-600 mt-2">プロフィール情報の確認とパスワード変更ができます</p>
        </div>

        <div className="space-y-6">
          {/* プロフィール情報カード */}
          <Card>
            <CardHeader>
              <CardTitle>プロフィール情報</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* プロフィール画像 */}
              {user?.adminFlag && (
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-25 w-30">
                      <AvatarImage src={profileImage || "/placeholder.svg"} alt="プロフィール画像" />
                      <AvatarFallback className="text-lg">{formData.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              )}
              
              <Separator />

              {/* 名前 */}
              <div className="space-y-2">
                <Label htmlFor="name">名前</Label>
                <Input
                  id="name"
                  value={formData.name}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                  placeholder="名前を入力してください"
                />
              </div>

              {/* 社員番号 */}
              <div className="space-y-2">
                <Label htmlFor="employeeId">社員番号</Label>
                <Input
                  id="employeeId"
                  value={formData.employeeId}
                  readOnly
                  className="bg-gray-50 cursor-not-allowed"
                  placeholder="社員番号を入力してください"
                />
              </div>
            </CardContent>
          </Card>

          {/* パスワード変更カード */}
          <Card>
            <CardHeader>
              <CardTitle>パスワード変更</CardTitle>
              <CardDescription>セキュリティのため定期的にパスワードを変更してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 現在のパスワード */}
              <div className="space-y-2">
                <Label htmlFor="currentPassword">現在のパスワード</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange("currentPassword", e.target.value)}
                    placeholder="現在のパスワードを入力してください"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* 新しいパスワード */}
              <div className="space-y-2">
                <Label htmlFor="newPassword">新しいパスワード</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => {
                      // 使用可能な文字のみ許可
                      const validChars = /^[a-zA-Z0-9!?_$#]*$/
                      if (validChars.test(e.target.value) || e.target.value === "") {
                        handleInputChange("newPassword", e.target.value)
                      }
                    }}
                    placeholder="新しいパスワードを入力してください"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* 確認用パスワード */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">確認用パスワード</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      // 使用可能な文字のみ許可
                      const validChars = /^[a-zA-Z0-9!?_$#]*$/
                      if (validChars.test(e.target.value) || e.target.value === "") {
                        handleInputChange("confirmPassword", e.target.value)
                      }
                    }}
                    placeholder="新しいパスワードを再入力してください"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* パスワード要件 */}
              <div className="text-sm bg-gray-50 p-4 rounded-md">
                <p className="font-medium mb-3 text-gray-700">パスワード要件:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getRequirementIcon(passwordRequirements.length)}
                    <span className={getRequirementColor(passwordRequirements.length)}>8文字以上</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRequirementIcon(passwordRequirements.uppercase)}
                    <span className={getRequirementColor(passwordRequirements.uppercase)}>大文字を含む</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRequirementIcon(passwordRequirements.lowercase)}
                    <span className={getRequirementColor(passwordRequirements.lowercase)}>小文字を含む</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRequirementIcon(passwordRequirements.number)}
                    <span className={getRequirementColor(passwordRequirements.number)}>数字を含む</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getRequirementIcon(passwordRequirements.special)}
                    <span className={getRequirementColor(passwordRequirements.special)}>特殊文字を含む (!?_$#)</span>
                  </div>
                </div>
              </div>

              {/* パスワード一致確認 */}
              {formData.confirmPassword && (
                <div className="text-sm">
                  {formData.newPassword === formData.confirmPassword ? (
                    <div className="flex items-center gap-2 text-green-500">
                      <Check className="h-4 w-4" />
                      <span>パスワードが一致しています</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-500">
                      <X className="h-4 w-4" />
                      <span>パスワードが一致しません</span>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* 保存ボタン */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="px-8">
              変更を保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
