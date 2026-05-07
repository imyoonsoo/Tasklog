"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // [추가] 페이지 이동을 위한 useRouter 훅
import { useRef, useState } from "react";

import plusicon from "@/assets/dashboard/ic-plusbtn.svg";
import settingicon from "@/assets/dashboard/ic-setting.svg";
import { PopDoverMenu } from "@/components/PopDoverMenu";
import { useClickOutside } from "@/hooks/useClickOutside";

interface ColumnListHeaderProp {
  title: string;
  contentCount: number;
  dashboardId: number; // [추가] 태스크 추가 페이지 이동 시 필요한 ID 값
  columnId: number;
  onSettingClick?: () => void;
}

export function ColumnListHeader({
  title,
  contentCount,
  dashboardId,
  columnId,
}: ColumnListHeaderProp) {
  const router = useRouter(); // [추가]
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  // [추가] + 버튼 클릭 시 실행될 핸들러
  const handleAddTask = () => {
    // 유효성 검사: ID가 없으면 경고창을 띄워 에러 방지
    if (!dashboardId || isNaN(dashboardId)) {
      alert("대시보드 ID를 찾을 수 없습니다. 페이지를 새로고침 해주세요.");
      return;
    }
    // 쿼리 스트링을 포함하여 task-add 페이지로 이동
    router.push(`/dashboard/${dashboardId}/task-add?columnId=${columnId}`);
  };

  const handleColumEdit = () => {
    router.push(
      `/dashboard/${dashboardId}/column-edit?columnId=${columnId}&columnName=${title}`
    );
  };

  const handleColumDelete = () => {
    router.push(`/dashboard/${dashboardId}/column-delete?columnId=${columnId}`);
  };

  const handleSettingClick = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="flex w-full items-center justify-between max-lg:w-full">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-[20px] font-bold text-white">{title}</h1>
        <span className="text-gray-400">{contentCount}</span>
      </div>
      <div className="flex gap-5">
        {/* [수정] 단순 아이콘에서 클릭 이벤트(handleAddTask)와 호버 애니메이션 추가 */}
        <Image
          src={plusicon}
          alt="add"
          height={20}
          width={20}
          onClick={handleAddTask}
          className="cursor-pointer transition-transform hover:scale-110"
        />
        {/* [수정] 불필요한 내부 핸들러(handleColumnEdit) 대신 props로 받은 onSettingClick 바로 연결 */}
        {/* 호버 시 90도 회전하는 시각적 피드백 추가 */}
        <div
          className="relative flex items-center justify-center"
          ref={containerRef}
        >
          <Image
            src={settingicon}
            alt="setting"
            onClick={handleSettingClick}
            height={20}
            width={20}
            className="cursor-pointer transition-transform hover:rotate-90"
          />
          {isOpen && (
            <PopDoverMenu
              onEdit={handleColumEdit}
              onDelete={handleColumDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
