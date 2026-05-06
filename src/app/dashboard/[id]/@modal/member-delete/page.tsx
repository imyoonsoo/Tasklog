"use client";

import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { deleteMember, getMyInfo } from "@/api/data";
import { Button } from "@/components/Button";
import { Modal } from "@/components/modal/Modal";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function MemberDelete() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const dashboardId = Number(params.id);
  const memberId = Number(searchParams.get("memberId"));
  const targetUserId = Number(searchParams.get("userId"));

  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const { mutate: handleDeleteMember, isPending: isLoading } = useMutation({
    mutationFn: () => deleteMember(memberId),
    onSuccess: async () => {
      const isMe = myInfo?.id === targetUserId;

      if (isMe) {
        await queryClient.invalidateQueries({ queryKey: ["dashboards"] });
        router.replace("/mydashboard");
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["members", dashboardId],
        });
        router.back();
      }
    },
    onError: (error: ApiError) => {
      const errorMessage =
        error.response?.data?.message || "멤버 제외에 실패했습니다.";
      alert(errorMessage);
    },
  });

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <h2 className="text-lg font-semibold text-gray-200 lg:text-xl">
            {myInfo?.id === memberId
              ? "대시보드에서 나가시겠습니까?"
              : "멤버를 제외하시겠습니까?"}
          </h2>
        </div>

        <div className="flex w-135 gap-5 max-md:w-73.75 max-md:gap-3">
          <Button
            colorType="secondary"
            className="flex-1"
            onClick={handleClose}
            disabled={isLoading}
          >
            취소
          </Button>
          <Button
            colorType="red"
            className="flex-1"
            onClick={() => handleDeleteMember()}
            disabled={isLoading}
          >
            {isLoading ? "제외 중..." : "제외"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
