"use client";

import { Button } from "@/components/Button";
import { Profile } from "@/components/profile/Profile";

import { UserInfo } from "./InvitionContainer";

export function InvitionRow({
  title,
  inviter,
  id,
  handleDismiss,
  handleAccept,
}: {
  title: string;
  inviter: UserInfo;
  id: number;
  handleDismiss: (id: number) => void;
  handleAccept: (id: number) => void;
}) {
  return (
    <div className="flex flex-col justify-between gap-1 px-2.5 pt-4 pb-4.5 md:flex-row">
      <div className="w-75">{title}</div>
      <div className="flex items-center justify-between">
        <div className="w-50">
          {/* 임시 컴포넌트 @TODO 교체 필요*/}
          <Profile name={inviter.nickname} type={"invite"} />
        </div>
        <div className="flex w-32.5 gap-3">
          <Button
            size={"sm"}
            colorType={"secondary"}
            onClick={() => handleDismiss(id)}
          >
            거절
          </Button>
          <Button size={"sm"} onClick={() => handleAccept(id)}>
            수락
          </Button>
        </div>
      </div>
    </div>
  );
}
