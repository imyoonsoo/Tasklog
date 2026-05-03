/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getColumnList, getMemberList, getCardDetail } from "@/api/data";
import { Modal } from "@/components/modal/Modal";
import TaskEditForm from "@/app/dashboard/[id]/_components/TaskEditForm";

export default function TaskEditModalPage() {
  const params = useParams();
  const dashboardId = Number(params.id);
  const taskId = Number(params.taskId);

  const [data, setData] = useState<{
    columns: any[];
    members: any[];
    taskDetail: any;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || !taskId) return;
      try {
        const [columnsData, membersData, taskDetail] = await Promise.all([
          getColumnList(dashboardId),
          getMemberList({ dashboardId, size: 100 }),
          getCardDetail(taskId),
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
  }, [dashboardId, taskId]);

  if (isLoading) {
    return (
      <Modal>
        <div className="flex min-h-125 w-full flex-col items-center justify-center p-10 md:w-135">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#00A200]" />
          <p className="mt-6 text-lg font-medium text-white">
            기존 정보를 가져오는 중입니다
          </p>
        </div>
      </Modal>
    );
  }

  if (!data || !data.taskDetail) return null;

  return (
    <Modal>
      <TaskEditForm
        columnList={data.columns}
        memberList={data.members}
        dashboardId={dashboardId}
        initialData={data.taskDetail}
      />
    </Modal>
  );
}
