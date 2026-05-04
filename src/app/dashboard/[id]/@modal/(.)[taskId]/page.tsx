// src/app/dashboard/[id]/@modal/(.)[taskId]/page.tsx
import { getCardDetail } from "@/api/data";
import { PageModal } from "@/components/modal/PageModal";
import { TaskDetail } from "@/components/TaskDetail/TaskDetail";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string; id: string }>;
}) {
  const { taskId, id: dashboardId } = await params;
  const taskIdNum = Number(taskId);
  const dashboardIdNum = Number(dashboardId);

  const cardInfo = await getCardDetail(taskIdNum);

  return (
    <PageModal>
      <TaskDetail cardInfo={cardInfo} dashboardId={dashboardIdNum} />
    </PageModal>
  );
}
