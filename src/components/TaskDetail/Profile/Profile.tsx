import Image from "next/image";

import { cn } from "@/lib/cn";
import { Assignee, User } from "@/types/api";
import { getRandomColor } from "@/utils/color";

interface ProfileProps {
  user: User | Assignee;
  className?: string;
}

export function Profile({ user, className }: ProfileProps) {
  const { profileImageUrl, nickname } = user;
  const firstLetter = nickname.charAt(0);
  return (
    <div className={cn("relative overflow-hidden rounded-full", className)}>
      {profileImageUrl ? (
        <Image
          src={profileImageUrl}
          alt="프로필 이미지"
          fill
          className="object-cover"
        />
      ) : (
        <div
          className={cn(
            getRandomColor(nickname),
            "flex h-full w-full items-center justify-center rounded-full"
          )}
        >
          {firstLetter}
        </div>
      )}
    </div>
  );
}
