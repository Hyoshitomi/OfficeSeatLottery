"use client"

import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

import { PasswordChangeCard } from "@/components/account/password-change-card"
import { ProfileCard } from "@/components/account/profile-card"
import { ProgressBar } from "@/components/account/progressbar"
import { Button } from "@/components/ui/button"
import { usePasswordValidation } from "@/hooks/use-password-validation"
import { useProgress } from "@/hooks/use-progress"

export default function Home() {
  const { data: session } = useSession()
  const user = session?.user
  
  const [validationAttempted, setValidationAttempted] = useState(false)
  const [formData, setFormData] = useState({
    name: user ? `${user.lastName} ${user.firstName}` : "取得失敗",
    employeeId: user?.employeeNumber ?? "取得失敗",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  
  const [profileImage] = useState(`/avatars/${user?.employeeNumber}.png`)
  const { isLoading, progress, startProgress, completeProgress, resetProgress } = useProgress()
  const { allValid, match } = usePasswordValidation(
    formData.newPassword, 
    formData.confirmPassword, 
    validationAttempted
  )

  const handleInputChange = (field, value) => {
    if (field === "name" || field === "employeeId") {
      return
    }
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const validatePasswordChange = () => {
    if (!formData.newPassword) return true

    if (!allValid) {
      toast.error("パスワードが要件を満たしていません")
      return false
    }
    if (!match) {
      toast.error("新しいパスワードと確認用パスワードが一致しません")
      return false
    }
    if (!formData.currentPassword) {
      toast.error("現在のパスワードを入力してください")
      return false
    }
    return true
  }

  const handlePasswordChange = async () => {
    const timer = startProgress()
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
      })
      const data = await res.json()
      
      completeProgress(timer)
      
      if (res.ok) {
        toast.success("パスワードが変更されました")
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }))
        setValidationAttempted(false)
      } else {
        toast.error(data.error || "パスワード変更に失敗しました")
      }
    } catch (_error) {
      resetProgress()
      toast.error("通信エラーが発生しました")
    }
  }

  const handleSave = async () => {
    setValidationAttempted(true)

    if (!validatePasswordChange()) {
      return
    }

    if (formData.newPassword) {
      await handlePasswordChange()
      return
    }

    toast.success("プロフィールが更新されました")
    setValidationAttempted(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">マイページ</h1>
          <p className="text-gray-600 mt-2">プロフィール情報の確認とパスワード変更ができます</p>
        </div>

        <div className="space-y-6">
          <ProfileCard
            name={formData.name}
            employeeId={formData.employeeId}
            profileImage={profileImage}
            isAdmin={user?.adminFlag}
          />

          <PasswordChangeCard
            currentPassword={formData.currentPassword}
            newPassword={formData.newPassword}
            confirmPassword={formData.confirmPassword}
            onChange={handleInputChange}
            validationAttempted={validationAttempted}
          />

          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="px-8" disabled={isLoading}>
              変更を保存
            </Button>
          </div>
        </div>
        <ProgressBar isLoading={isLoading} progress={progress} />
      </div>
    </div>
  )
}
