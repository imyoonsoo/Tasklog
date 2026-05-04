import { redirect } from "next/navigation";

import { getCardDetail } from "@/api/data";
import { TaskDetail } from "@/components/TaskDetail/TaskDetail";

export default async function Task({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id: dashboardId } = await params;
  const taskIdNum = Number(taskId);
  const dashboardIdNum = Number(dashboardId);

  const cardInfo = await getCardDetail(taskIdNum);

  if (cardInfo.dashboardId !== dashboardIdNum) {
    redirect(`/dashboard/${dashboardIdNum}`);
  }

  return <TaskDetail cardInfo={cardInfo} dashboardId={dashboardIdNum} />;
}
