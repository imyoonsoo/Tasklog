"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { deleteDashboard } from "@/api/data";
import { Button } from "@/components/Button";
import { Modal } from "@/components/modal/Modal";

export default function DashboardDelete() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();

  const dashboardId = Number(params.id);

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteDashboard(dashboardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboards"] });
      router.replace("/mydashboard");
    },
    onError: (error) => {
      console.error("대시보드 삭제 실패:", error);
      alert("삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const handleDelete = () => {
    if (!dashboardId || isNaN(dashboardId)) {
      alert("유효하지 않은 대시보드 ID입니다.");
      return;
    }
    mutate();
  };

  return (
    <Modal>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <h2 className="text-lg font-semibold text-gray-200 lg:text-xl">
            대시보드를 삭제하시겠습니까?
          </h2>
          <p className="text-base font-semibold whitespace-nowrap text-gray-400 lg:text-lg">
            대시보드 내 모든 내용이 함께 삭제됩니다.
          </p>
        </div>

        <div className="flex w-135 gap-5 max-md:w-73.75 max-md:gap-3">
          <Button
            colorType="secondary"
            className="flex-1"
            onClick={() => router.back()}
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
