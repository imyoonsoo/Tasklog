import { getCardDetail } from "@/api/data";
import { TaskDetail } from "@/components/TaskDetail/TaskDetail";

export default async function CardPage({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;
  const cardInfo = await getCardDetail(Number(cardId));

  return <TaskDetail cardInfo={cardInfo} />;
}
