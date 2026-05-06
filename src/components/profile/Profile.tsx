import Image from "next/image";

import { cn } from "@/lib/cn";
import { getRandomColor } from "@/utils/color";

interface ProfileImageProps {
  name: string;
  imageUrl?: string | null;
  className?: string;
}

/**
 * 프로필 이미지 컴포넌트
 */
export function ProfileImage({ name, imageUrl, className }: ProfileImageProps) {
  return (
    <div
      className={cn(
        "relative flex h-7.5 w-7.5 shrink-0 items-center justify-center overflow-hidden rounded-full",
        className
      )}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`${name}의 프로필 이미지`}
          fill
          sizes="30px"
          className="rounded-full object-cover"
        />
      ) : (
        <div
          className={cn(
            getRandomColor(name),
            "flex h-full w-full items-center justify-center rounded-full text-sm font-semibold text-white"
          )}
        >
          {name.slice(0, 2)}
        </div>
      )}
    </div>
  );
}

interface ProfileTextProps {
  name: string;
  className?: string;
}

/**
 * 프로필 텍스트(닉네임) 컴포넌트
 */
export function ProfileText({ name, className }: ProfileTextProps) {
  return (
    <span
      className={cn(
        "inline-block truncate text-lg max-md:max-w-37.5 max-md:text-base",
        className
      )}
    >
      {name}
    </span>
  );
}

interface ProfileWrapperProps {
  name: string;
  imageUrl?: string | null;
  profileClassName?: string;
}

/**
 * 프로필 통합 컴포넌트
 * 기본적으로 이미지와 텍스트를 함께 렌더링하며, showText 옵션으로 조절 가능합니다.
 */
export function ProfileWrapper({
  name,
  imageUrl,
  profileClassName,
}: ProfileWrapperProps) {
  return (
    <div className="relative flex items-center gap-2">
      <ProfileImage
        name={name}
        imageUrl={imageUrl}
        className={profileClassName}
      />
      <ProfileText name={name} />
    </div>
  );
}

// ProfileWrapper.Image = ProfileImage;
// ProfileWrapper.Text = ProfileText;
