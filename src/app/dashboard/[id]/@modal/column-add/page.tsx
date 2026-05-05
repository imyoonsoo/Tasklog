"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

import { postColumn } from "@/api/data";
import { Button } from "@/components/Button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { Modal } from "@/components/modal/Modal";
import { ModalHeader } from "@/components/modal/ModalHeader";

export default function ColumnAdd() {
  const router = useRouter();
  const { id } = useParams();
  const [value, setValue] = useState("");
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const dashboardId = Number(id);

  const handleCreateNewColumn = async (e: React.MouseEvent) => {
    e.preventDefault();
    await postColumn({
      title: value,
      dashboardId: dashboardId,
    });
    router.back();
  };

  const handleClickCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };
  return (
    <Modal>
      <div className="flex w-fit flex-col gap-4 md:gap-2.5">
        <div className="md:pb-4.5">
          <ModalHeader>칼럼 추가</ModalHeader>
        </div>
        <form>
          <Input>
            <Label htmlFor="email">이름</Label>
            <Input.Wrapper>
              <Input.Field
                placeholder="컬럼 이름을 작성해주세요"
                value={value}
                onChange={handleFieldChange}
              />
            </Input.Wrapper>
            <Input.Error />
          </Input>

          <div className="flex w-73.75 gap-3 pt-4 md:mt-7.5 md:w-135 md:pt-0">
            <Button
              onClick={handleClickCancel}
              colorType="secondary"
              type="button"
            >
              취소
            </Button>
            <Button onClick={handleCreateNewColumn} type="submit">
              생성
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
