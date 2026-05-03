import { getCardDetail } from "@/api/data";
import { PageModal } from "@/components/modal/PageModal";
import { TaskDetail } from "@/components/TaskDetail/TaskDetail";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;
  const cardInfo = await getCardDetail(Number(cardId));

  return (
    <PageModal>
      <TaskDetail cardInfo={cardInfo} />
    </PageModal>
  );
}
