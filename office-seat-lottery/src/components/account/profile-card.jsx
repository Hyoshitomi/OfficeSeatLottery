import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

/**
 * タイトル: ProfileCard / プロフィール情報表示カード
 * 要約: ユーザーの名前、社員番号、プロフィール画像などの情報を表示するためのカードコンポーネントです。
 * @param {{
 *   name:          string,
 *   employeeId:    string | number,
 *   profileImage?: string,
 *   isAdmin:       boolean
 * }} props
 * @param {string} props.name - ユーザーの名前。
 * @param {string | number} props.employeeId - ユーザーの社員番号。
 * @param {string} [props.profileImage] - プロフィール画像のURL（オプション）。
 * @param {boolean} props.isAdmin - 管理者権限を持つかどうかのフラグ。
 * @returns {import('react').ReactElement} プロフィール情報カードのJSX要素。
 */
export function ProfileCard({ name, employeeId, profileImage, isAdmin }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール情報</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {isAdmin && (
          <>
            <div className="flex items-center justify-center">
              <Avatar className="h-24 w-24">
                <AvatarImage src={profileImage} alt={`${name}のプロフィール画像`} />
                <AvatarFallback>{name?.[0] || '?'}</AvatarFallback>
              </Avatar>
            </div>
            <Separator />
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input id="name" value={name} readOnly />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employeeId">社員番号</Label>
          <Input id="employeeId" value={employeeId} readOnly />
        </div>
      </CardContent>
    </Card>
  );
}
