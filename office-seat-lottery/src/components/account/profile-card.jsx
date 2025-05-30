import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

export function ProfileCard({ name, employeeId, profileImage, isAdmin }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdmin && (
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-25 w-30">
                <AvatarImage src={profileImage || "/placeholder.svg"} alt="プロフィール画像" />
                <AvatarFallback className="text-lg">{name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            value={name}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
            placeholder="名前を入力してください"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employeeId">社員番号</Label>
          <Input
            id="employeeId"
            value={employeeId}
            readOnly
            className="bg-gray-50 cursor-not-allowed"
            placeholder="社員番号を入力してください"
          />
        </div>
      </CardContent>
    </Card>
  )
}
