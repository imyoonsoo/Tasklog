"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { getColumnList, getMemberList } from "@/api/data";
import { Modal } from "@/components/modal/Modal";

import { TaskAddForm } from "./_components/TaskAddForm";

interface Member {
  userId: number;
  nickname: string;
  profileImageUrl?: string | null;
}

interface Column {
  id: number;
  title: string;
}

export default function TaskAddPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const dashboardId = Number(params.id);

  const columnId = Number(searchParams.get("columnId"));

  const [data, setData] = useState<{
    columns: Column[];
    members: Member[];
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!dashboardId || isNaN(dashboardId)) {
        setIsLoading(false);
        return;
      }
      try {
        const [columnsData, membersData] = await Promise.all([
          getColumnList(dashboardId),
          getMemberList({
            dashboardId,
            size: 100,
          }),
        ]);

        setData({
          columns: columnsData.data || [],
          members: membersData.members || [],
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dashboardId]);

  if (isLoading) {
    return (
      <Modal>
        <div className="flex min-h-125 w-full flex-col items-center justify-center p-10 md:w-135">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-[#00A200]" />

          <p className="mt-6 text-lg font-medium text-white">
            데이터를 불러오는 중입니다
          </p>
          <p className="mt-2 text-sm text-gray-400">잠시만 기다려 주세요.</p>
        </div>
      </Modal>
    );
  }

  if (!data) return null;

  return (
    <Modal>
      <TaskAddForm
        columnList={data.columns}
        memberList={data.members}
        dashboardId={dashboardId}
        columnId={columnId}
      />
    </Modal>
  );
}
