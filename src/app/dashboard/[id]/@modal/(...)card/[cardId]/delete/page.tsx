"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { deleteCard } from "@/api/data";
import { Button } from "@/components/Button";
import { Modal } from "@/components/modal/Modal";
import { cardKeys } from "@/hooks/useCards";

export default function TaskDeleteModalPage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const cardId = Number(params.cardId);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKeys.all });
    },
    onError: () => {
      alert("카드 삭제에 실패했습니다.");
    },
  });

  const handleDelete = () => {
    mutate();
    router.back();
  };

  return (
    <Modal>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <h2 className="text-lg font-semibold text-gray-200 lg:text-xl">
            카드를 삭제하시겠습니까?
          </h2>
          <p className="text-base font-semibold whitespace-nowrap text-gray-400 lg:text-lg">
            삭제된 카드는 복구할 수 없습니다.
          </p>
        </div>

        <div className="flex w-135 gap-5 max-md:w-73.75 max-md:gap-3">
          <Button
            colorType="secondary"
            className="flex-1"
            onClick={() => router.replace(`/card/${cardId}`)}
            disabled={isPending}
          >
            취소
          </Button>
          <Button
            className="flex-1"
            colorType="red"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "삭제 중..." : "삭제"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
