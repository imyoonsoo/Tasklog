"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { postInvitation } from "@/api/data";
import { Button } from "@/components/Button";
import { Input } from "@/components/input/input";
import { Label } from "@/components/label/label";
import { Modal } from "@/components/modal/Modal";
import { ModalHeader } from "@/components/ModalHeader";
import { refreshDashboardData } from "@/utils/dashboard";

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function Invite() {
  const router = useRouter();
  const params = useParams();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dashboardId = Number(params.id);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    if (!dashboardId) return;

    try {
      setIsLoading(true);

      await postInvitation(dashboardId, { email });

      await refreshDashboardData(dashboardId);

      router.back();
    } catch (error) {
      const err = error as ApiError;
      const errorMessage =
        err.response?.data?.message || "초대에 실패했습니다.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <ModalHeader>초대하기</ModalHeader>
        <div className="flex flex-col gap-7.5">
          <Input>
            <Label htmlFor="name">이메일</Label>
            <Input.Wrapper>
              <Input.Field
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력해주세요"
                required
              />
            </Input.Wrapper>
          </Input>
          <div className="flex w-135 gap-5 max-md:w-73.75 max-md:gap-3">
            <Button
              type="button"
              colorType="secondary"
              className="flex-1"
              onClick={handleClose}
              disabled={isLoading}
            >
              취소
            </Button>
            <Button
              disabled={isLoading}
              className="bg-brand-500 hover:bg-brand-800 flex-1 text-white"
            >
              초대
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
