import { Badge } from "@/components/Badge/Badge";
import { CardResponse } from "@/types/api";

type BadgeInfoProps = Pick<CardResponse, "tags">;

export function BadgeContainer({ tags }: BadgeInfoProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <Badge key={idx}>{tag}</Badge>
      ))}
    </div>
  );
}
