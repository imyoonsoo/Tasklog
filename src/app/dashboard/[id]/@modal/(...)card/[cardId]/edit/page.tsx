/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCardDetail, getColumnList, getMemberList } from "@/api/data";

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

  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || !cardId) return;

      try {
        const [columnsData, membersData, taskDetail] = await Promise.all([
          getColumnList(dashboardId),
          getMemberList({
            dashboardId,
            size: 100,
          }),
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
      <Modal>
        <div className="flex min-h-[400px] w-[500px] flex-col items-center justify-center gap-5 text-white">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#00A200]" />
          <p>기존 정보를 가져오는 중입니다</p>
        </div>
      </Modal>
    );
  }

  if (!data) return null;

  const { columns, members, taskDetail } = data;

  return (
    <Modal>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 z-[100] flex h-full max-h-[820px] w-full max-w-[375px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto bg-[#1B1A1F] p-5 text-white shadow-2xl [scrollbar-width:none] md:h-auto md:max-h-[calc(100vh-100px)] md:max-w-[600px] md:rounded-3xl md:border md:border-[#333] md:p-7 [&::-webkit-scrollbar]:hidden"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">할 일 수정</h2>

          <ModalCloseButton />
        </div>

        <TaskEditForm
          columnList={columns}
          memberList={members}
          dashboardId={dashboardId}
          initialData={taskDetail}
          onCancel={() =>
            router.replace(`/dashboard/${dashboardId}`, { scroll: false })
          }
        />
      </div>
    </Modal>
  );
}
