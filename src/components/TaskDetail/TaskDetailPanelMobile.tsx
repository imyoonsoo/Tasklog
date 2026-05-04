import { CardResponse } from "@/types/api";

import { Profile } from "./Profile/Profile";
import { TaskDetailPanelInfo } from "./TaskDetailPanelInfo";

interface TaskDetailPanelMobileProps extends Pick<
  CardResponse,
  "dueDate" | "assignee"
> {
  dashboardName: string;
  columnName: string;
}

export function TaskDetailPanelMobile({
  dueDate,
  assignee,
  dashboardName,
  columnName,
}: TaskDetailPanelMobileProps) {
  return (
    <div className="divide-black-600 flex flex-col divide-y text-gray-100 lg:hidden">
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
  );
}
