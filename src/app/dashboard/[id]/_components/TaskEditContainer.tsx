"use client";

import { useEffect, useState } from "react";

import { getCardDetail, getColumnList, getMemberList } from "@/api/data";
import type { Card, ColumnResponse, Member } from "@/types/api";

import { TaskEditForm } from "./TaskEditForm";

interface Props {
  cardId: number;
  onCancel: () => void;
}

interface TaskEditData {
  columns: ColumnResponse[];
  members: Member[];
  dashboardId: number;
  taskDetail: Card;
}

export function TaskEditContainer({ cardId, onCancel: handleCancel }: Props) {
  const [data, setData] = useState<TaskEditData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!cardId) return;
      try {
        const taskDetail = await getCardDetail(cardId);
        const { dashboardId } = taskDetail;

        const [columnsData, membersData] = await Promise.all([
          getColumnList(dashboardId),
          getMemberList({ dashboardId, size: 100 }),
        ]);
        setData({
          columns: columnsData.data || [],
          members: membersData.members || [],
          dashboardId,
          taskDetail,
        });
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [cardId]);

  if (isLoading) {
    return (
      <div className="-mt-16 flex min-h-125 w-full flex-col items-center justify-center p-10 md:min-h-150">
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
      dashboardId={data.dashboardId}
      initialData={data.taskDetail}
      onCancel={handleCancel}
    />
  );
}
