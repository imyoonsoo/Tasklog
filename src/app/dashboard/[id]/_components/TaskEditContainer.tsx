/* src/app/dashboard/[id]/_components/TaskEditContainer.tsx */
"use client";

import { useEffect, useState } from "react";
import { getCardDetail, getColumnList, getMemberList } from "@/api/data";
import TaskEditForm from "./TaskEditForm";

interface Props {
  dashboardId: number;
  cardId: number;
  onCancel: () => void;
}

export default function TaskEditContainer({
  dashboardId,
  cardId,
  onCancel,
}: Props) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || !cardId) return;
      try {
        const [columnsData, membersData, taskDetail] = await Promise.all([
          getColumnList(dashboardId),
          getMemberList({ dashboardId, size: 100 }),
          getCardDetail(cardId),
        ]);
        setData({
          columns: columnsData.data || [],
          members: membersData.members || [],
          taskDetail,
        });
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [dashboardId, cardId]);

  if (isLoading) {
    return (
      <div className="-mt-16 flex min-h-[500px] w-full flex-col items-center justify-center p-10 md:min-h-[600px]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#00A200]" />
        <p className="mt-6 text-lg font-medium text-white">
          데이터를 불러오는 중입니다
        </p>
        <p className="mt-2 text-sm text-gray-400">잠시만 기다려 주세요.</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <TaskEditForm
      columnList={data.columns}
      memberList={data.members}
      dashboardId={dashboardId}
      initialData={data.taskDetail}
      onCancel={onCancel}
    />
  );
}
