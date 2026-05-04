import { CardResponse } from "@/types/api";

import { BadgeContainer } from "../Badge/BadgeContainer";
import { ModalCloseButton } from "../modal/ModalCloseButton";

import { KebabButton } from "./KebabButton";

interface TaskDetailHeaderProps extends Pick<CardResponse, "title" | "tags"> {
  dashboardId: number;
  taskId: string;
}

export function TaskDetailHeader({
  title,
  tags,
  dashboardId,
  taskId,
}: TaskDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-3 border-b-2 border-gray-800 pb-5">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        <div className="flex gap-5 lg:hidden">
          <KebabButton dashboardId={dashboardId} taskId={taskId} />
          <ModalCloseButton />
        </div>
      </div>
      <BadgeContainer tags={tags} />
    </div>
  );
}
