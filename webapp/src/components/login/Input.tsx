import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginInput({
  id,
  content,
  placeholder,
  type = "text",
}: {
  id: string;
  content: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{content}</Label>
      <Input type={type} id={id} placeholder={placeholder} />
    </div>
  );
}
