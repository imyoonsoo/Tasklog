"use client";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { getColumnList, putColumnUpdate } from "@/api/data";
import { Button } from "@/components/Button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { Modal } from "@/components/modal/Modal";
import { ModalHeader } from "@/components/modal/ModalHeader";

export default function ColumEditModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const [error, setError] = useState("");

  const columnId = Number(searchParams.get("columnId"));
  const existingColumnName = searchParams.get("columnName") || "";
  const [title, setTitle] = useState(existingColumnName);

  const dashboardId = Number(params.id || params.dashboardId);

  const handleCancel = () => {
    router.back();
  };

  const handleEdit = async () => {
    setError(""); // 에러 메시지 초기화

    // 1. 입력값 유효성 검사 (아무것도 입력하지 않은 경우)
    if (!title.trim()) {
      setError("수정할 칼럼명을 입력해 주세요.");
      return;
    }

    // 2. 수정하려는 이름이 기존 이름과 똑같다면 중복 검사를 건너뜁니다.
    if (title.trim() === existingColumnName.trim()) {
      router.back();
      return;
    }

    try {
      // 3. 현재 대시보드의 칼럼 목록 조회
      if (!dashboardId || isNaN(dashboardId)) {
        alert("대시보드 ID를 찾을 수 없습니다.");
        return;
      }

      const columnData = await getColumnList(dashboardId);

      const isDuplicate = columnData.data.some(
        (col: { title: string }) => col.title.trim() === title.trim()
      );

      if (isDuplicate) {
        setError("중복된 칼럼명입니다.");
        return;
      }

      if (!columnId || isNaN(columnId)) {
        alert("올바르지 않은 칼럼 ID입니다.");
        return;
      }

      await putColumnUpdate(columnId, { title: title.trim() });

      router.back();
    } catch (error) {
      console.error("칼럼 수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Modal>
      <ModalHeader>칼럼 수정</ModalHeader>
      <div className="w-83.775 md:w-135">
        <Input errorMessage={error}>
          <Label
            htmlFor="columnModify"
            className="mt-4 mb-1 text-base md:mt-5 md:text-lg"
          >
            칼럼 이름
          </Label>
          <Input.Wrapper>
            <Input.Field
              id="columnModify"
              placeholder="수정할 칼럼명을 입력해주세요"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
          </Input.Wrapper>
          <Input.Error />
        </Input>

        <div className="mt-5 flex items-center justify-center gap-3 md:gap-5">
          <Button
            size="lg"
            colorType="secondary"
            className="flex-1 max-md:h-12.5"
            onClick={() => handleCancel()}
          >
            취소
          </Button>
          <Button
            size="lg"
            className="flex-1 max-md:h-12.5"
            colorType="primary"
            onClick={() => handleEdit()}
          >
            수정
          </Button>
        </div>
      </div>
    </Modal>
  );
}
