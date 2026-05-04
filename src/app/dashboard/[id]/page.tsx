"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";

import { getColumnList, getDashboardDetail } from "@/api/data";
import { HashtagIcon } from "@/assets/dashboard/ic-colorchips";

import { ColumnAdd } from "./_components/ColumnAdd";
import { ColumnList } from "./_components/ColumnList";

export interface ColumnList {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

interface DashboardPageProps {
  params: Promise<{ id: number }>; // URL 파라미터는 무조건 string!
}

export default function Dashboard({ params }: DashboardPageProps) {
  const [columnList, setColumnList] = useState<ColumnList[]>();
  const [activeCol, setActiveCol] = useState(columnList?.[0]);
  const [dashboardDetail, setDashboardDetail] = useState<Dashboard>();
  const { id } = use(params);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchdashboardData = async () => {
      const columnData = await getColumnList(id);
      const dashboardData = await getDashboardDetail(id);
      setColumnList(columnData.data);
      setDashboardDetail(dashboardData);

      //columndata가 불러와졌고, 유효할 때 activeCol을 0번 인덱스로 초기화
      if (columnData.data && columnData.data.length > 0) {
        setActiveCol(columnData.data[0]);
      }
    };
    fetchdashboardData();
  }, [id, searchParams]);

  const handleTabSwitch = (col: ColumnList) => {
    setActiveCol(() => col);
  };

  if (!columnList || !dashboardDetail) {
    // @TODO 스켈레톤 UI 삽입
    return <div className="p-10 text-white">로딩 중...</div>;
  }

  return (
    <div className="px-5 text-gray-100 lg:px-12.5">
      <div className="flex items-center gap-1 pt-6 pb-3.5 md:mx-10 lg:mx-0">
        <HashtagIcon color={dashboardDetail.color} />
        <h1 className="text-2xl font-bold">{dashboardDetail?.title}</h1>
      </div>
      {/* 모바일과 태블릿 환경 전용 UI */}
      <div className="flex w-full items-center justify-between md:mx-10 lg:hidden [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-2 overflow-scroll py-6 [-ms-overflow-style:none] [scrollbar-width:none]">
          {columnList.map((column) => (
            <button
              key={column.id}
              value={column.title}
              onClick={() => handleTabSwitch(column)}
              className={`min-h-8 cursor-pointer rounded-4xl border border-gray-600 px-4 whitespace-nowrap transition-colors ${
                activeCol?.id === column.id
                  ? "bg-green-500 text-white"
                  : "bg-gray-900"
              }`}
            >
              {column.title}
            </button>
          ))}
        </div>
        <Link href={`/dashboard/${id}/column-add`} className="">
          <button className="active:bg-black-700 m-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-700 text-3xl text-gray-400 hover:bg-gray-500">
            +
          </button>
        </Link>
      </div>
      {/* 실제 컬럼 리스트 */}
      <div className="pt-2.5 lg:hidden">
        <div className="flex w-full justify-center gap-1.5">
          {activeCol ? (
            <div>
              <ColumnList key={activeCol.id} column={activeCol} />
              <ColumnAdd />
            </div>
          ) : (
            <div className="text-gray-400">컬럼 데이터가 없습니다.</div>
          )}
        </div>
      </div>

      {/* 데스크탑 전용 화면 */}
      <div className="hidden gap-15 lg:flex">
        {columnList?.map((column) => (
          <ColumnList key={column.id} column={column} />
        ))}
        <div className="group fixed right-8 bottom-5 z-50 text-right">
          <div className="relative inline-block cursor-pointer text-5xl">
            +
            <div className="invisible absolute right-0 bottom-full mb-2 cursor-default text-left text-base opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <Link href={`/dashboard/${id}/column-add`}>
                <ColumnAdd />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
