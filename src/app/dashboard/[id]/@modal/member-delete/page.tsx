"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { deleteMember } from "@/api/data";
import { Button } from "@/components/Button";
import { Modal } from "@/components/modal/Modal";
import { refreshDashboardData } from "@/utils/dashboard";

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
  const [isLoading, setIsLoading] = useState(false);

  const dashboardId = Number(params.id);
  const memberId = Number(searchParams.get("memberId"));

  const handleClose = () => {
    router.back();
  };

  const handleDeleteMember = async () => {
    if (!memberId) {
      alert("삭제할 멤버 정보가 없습니다.");
      return;
    }

    try {
      setIsLoading(true);

      await deleteMember(memberId);

      if (dashboardId) {
        await refreshDashboardData(dashboardId);
      }

      router.back();
    } catch (error) {
      const err = error as ApiError;
      const errorMessage =
        err.response?.data?.message || "멤버 제외에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <div className="flex w-full flex-col items-center gap-10">
        <div className="flex w-full flex-col items-center gap-2 md:gap-3">
          <h2 className="text-lg font-semibold text-gray-200 lg:text-xl">
            멤버를 제외하시겠습니까?
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
            onClick={handleDeleteMember}
            disabled={isLoading}
          >
            {isLoading ? "제외 중..." : "제외"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
