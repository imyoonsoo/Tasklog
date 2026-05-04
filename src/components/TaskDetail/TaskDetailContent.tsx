import Image from "next/image";

import { CardResponse } from "@/types/api";

type TaskDetailContentProps = Pick<CardResponse, "description" | "imageUrl">;

export function TaskDetailContent({
  description,
  imageUrl,
}: TaskDetailContentProps) {
  return (
    <div className="flex max-h-200 flex-col gap-5">
      <p className="text-base text-gray-100">{description}</p>
      {imageUrl && (
        <Image src={imageUrl} width={361} height={219} alt="카드 이미지" />
      )}
    </div>
  );
}
