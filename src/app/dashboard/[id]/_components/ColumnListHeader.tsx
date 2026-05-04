"use client";

import Image from "next/image";
import { useRouter } from "next/navigation"; // [추가] 페이지 이동을 위한 useRouter 훅

import plusicon from "@/assets/dashboard/ic-plusbtn.svg";
import settingicon from "@/assets/dashboard/ic-setting.svg";

interface ColumnListHeaderProp {
  title: string;
  contentCount: number;
  dashboardId: number; // [추가] 태스크 추가 페이지 이동 시 필요한 ID 값
  onSettingClick?: () => void;
}

export function ColumnListHeader({
  title,
  contentCount,
  dashboardId,
  // onSettingClick,
}: ColumnListHeaderProp) {
  const router = useRouter(); // [추가]

  // [추가] + 버튼 클릭 시 실행될 핸들러
  const handleAddTask = () => {
    // 유효성 검사: ID가 없으면 경고창을 띄워 에러 방지
    if (!dashboardId || isNaN(dashboardId)) {
      alert("대시보드 ID를 찾을 수 없습니다. 페이지를 새로고침 해주세요.");
      return;
    }
    // 쿼리 스트링을 포함하여 task-add 페이지로 이동
    router.push(`/task-add?dashboardId=${dashboardId}`);
  };

  return (
    <div className="flex w-full max-w-83 items-center justify-between">
      <div className="flex justify-center gap-2">
        {/* font-bold 추가하여 가독성 강화 */}
        <h1 className="text-[20px] font-bold text-white">{title}</h1>
        <span className="text-gray-400">{contentCount}</span>
      </div>
      <div className="flex gap-5">
        {/* [수정] 단순 아이콘에서 클릭 이벤트(handleAddTask)와 호버 애니메이션 추가 */}
        <Image
          src={plusicon}
          alt="add"
          onClick={handleAddTask}
          className="cursor-pointer transition-transform hover:scale-110"
        />
        {/* [수정] 불필요한 내부 핸들러(handleColumnEdit) 대신 props로 받은 onSettingClick 바로 연결 */}
        {/* 호버 시 90도 회전하는 시각적 피드백 추가 */}
        <Image
          src={settingicon}
          alt="setting"
          // onClick={onSettingClick}
          className="cursor-pointer transition-transform hover:rotate-90"
        />
      </div>
    </div>
  );
}
