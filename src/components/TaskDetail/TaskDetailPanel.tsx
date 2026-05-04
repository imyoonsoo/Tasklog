import { ModalCloseButton } from "@/components/modal/ModalCloseButton";
import { KebabButton } from "@/components/TaskDetail/KebabButton";
import type { Assignee } from "@/types/api";

import { Profile } from "./Profile/Profile";
import { TaskDetailPanelInfo } from "./TaskDetailPanelInfo";

interface TaskDetailPanelProps {
  dueDate: string;
  assignee: Assignee;
  dashboardName: string;
  columnName: string;
  dashboardId: number;
  taskId: string;
}

export function TaskDetailPanel({
  dueDate,
  assignee,
  dashboardName,
  columnName,
  dashboardId,
  taskId,
}: TaskDetailPanelProps) {
  return (
    <div className="flex h-full w-57.5 flex-col gap-3 bg-[#2f2f33] px-5 py-7.5">
      <div className="flex items-center justify-end gap-5">
        <KebabButton dashboardId={dashboardId} taskId={taskId} />
        <ModalCloseButton />
      </div>
      <div className="divide-black-600 flex flex-col divide-y text-gray-100">
        <TaskDetailPanelInfo label="프로젝트">
          {dashboardName} / {columnName}
        </TaskDetailPanelInfo>
        <TaskDetailPanelInfo label="담당자">
          <div className="flex items-center gap-1.5">
            {assignee && (
              <Profile user={assignee} className="h-5 w-5 text-[8px]" />
            )}
            {assignee?.nickname}
          </div>
        </TaskDetailPanelInfo>
        <TaskDetailPanelInfo label="마감일">{dueDate}</TaskDetailPanelInfo>
      </div>
    </div>
  );
}
