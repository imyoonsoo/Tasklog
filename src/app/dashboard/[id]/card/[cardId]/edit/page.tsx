/* src/app/dashboard/[id]/card/[cardId]/edit/page.tsx */
/* 수정 페이지 - 생성 모달과 동일 디자인 */

"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getCardDetail, getColumnList, getMemberList } from "@/api/data";
import { ModalCloseButton } from "@/components/modal/ModalCloseButton";
import TaskEditForm from "@/app/dashboard/[id]/_components/TaskEditForm";

export default function TaskEditPage() {
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
        console.error("수정 데이터 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dashboardId, cardId]);

  if (isLoading) {
    return (
      <div className="bg-modal-background fixed top-1/2 left-1/2 z-[100] flex h-full max-h-203 w-full max-w-93.75 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-white md:h-auto md:w-126.5 md:rounded-3xl md:border md:border-[#333] lg:w-150">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#00A200]" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-modal-background fixed top-1/2 left-1/2 z-[100] flex h-full max-h-203 w-full max-w-93.75 -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto p-5 text-white shadow-2xl [scrollbar-width:none] md:h-auto md:max-h-[calc(100vh-100px)] md:w-126.5 md:max-w-none md:rounded-3xl md:border md:border-[#333] md:p-7 lg:max-h-[calc(100vh-128px)] lg:w-150 lg:p-7.5 [&::-webkit-scrollbar]:hidden">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">할 일 수정</h2>

        <ModalCloseButton />
      </div>

      <TaskEditForm
        columnList={data.columns}
        memberList={data.members}
        dashboardId={dashboardId}
        initialData={data.taskDetail}
        onCancel={() => router.push(`/dashboard/${dashboardId}`)}
      />
    </div>
  );
}
