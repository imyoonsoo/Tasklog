/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getColumnList, getMemberList, getCardDetail } from "@/api/data";
import { Modal } from "@/components/modal/Modal";
import { ModalCloseButton } from "@/components/modal/ModalCloseButton";
import TaskEditForm from "@/app/dashboard/[id]/_components/TaskEditForm";

export default function TaskEditModalPage() {
  const params = useParams();
  const router = useRouter();

  const dashboardId = Number(params.id);
  const cardId = Number(params.cardId);

  const [data, setData] = useState<{
    columns: any[];
    members: any[];
    taskDetail: any;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const handleSafeClose = () => {
    router.push(`/dashboard/${dashboardId}`, { scroll: false });
  };

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
          taskDetail: taskDetail,
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
      <Modal>
        <div className="flex min-h-[400px] w-[500px] items-center justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-[#00A200]" />
        </div>
      </Modal>
    );
  }

  if (!data || !data.taskDetail) return null;

  return (
    <Modal>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">할 일 수정</h2>
          <ModalCloseButton />
        </div>

        <TaskEditForm
          columnList={data.columns}
          memberList={data.members}
          dashboardId={dashboardId}
          initialData={data.taskDetail}
          onCancel={handleSafeClose}
        />
      </div>
    </Modal>
  );
}
