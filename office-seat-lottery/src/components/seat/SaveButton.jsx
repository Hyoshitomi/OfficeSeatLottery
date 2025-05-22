import { Button } from '@/components/ui/button'

export default function SaveButton({ onClick }) {
  return (
    <Button className="w-[90%]" onClick={onClick}>保存</Button>
  );
}
