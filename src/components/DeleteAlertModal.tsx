"use client";
import { useRouter, useSearchParams } from "next/navigation";

import { deleteColumn } from "@/api/data";

import { Button } from "./Button";

export function DeleteAlertModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const columnId = Number(searchParams.get("columnId"));

  const handleCancel = () => {
    router.back();
  };

  const handleDelete = async () => {
    if (!columnId || isNaN(columnId)) {
      alert("올바르지 않은 칼럼 ID입니다.");
      return;
    }

    try {
      await deleteColumn(columnId);
      router.back();
      router.refresh();
    } catch (error) {
      console.error("칼럼 삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-83.775 md:w-135">
      <div className="flex w-full flex-col items-center gap-2 md:gap-3">
        <h2 className="text-lg font-semibold text-gray-200 lg:text-xl">
          칼럼을 삭제하시겠습니까?
        </h2>
        <p className="text-base font-semibold whitespace-nowrap text-gray-400 lg:text-lg">
          칼럼 내 모든 카드도 함께 삭제됩니다.
        </p>
      </div>

      <div className="mt-5 flex items-center justify-center gap-3 md:gap-5">
        <Button
          colorType="secondary"
          className="h-12.5 flex-1 text-base text-gray-200 lg:h-14 lg:text-lg"
          onClick={() => handleCancel()}
        >
          취소
        </Button>
        <Button
          className="bg-profile-rose h-12.5 flex-1 text-base text-white hover:bg-red-800 active:bg-red-900 lg:h-14 lg:text-lg"
          onClick={() => handleDelete()}
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
