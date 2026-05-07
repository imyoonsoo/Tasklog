"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { useCardListQuery } from "@/hooks/useCards";

import { ColumnCard } from "./ColumnCard";
import { ColumnListHeader } from "./ColumnListHeader";
import { NoCard } from "./NoCard";

interface ColumnList {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}

export function ColumnList({ column }: { column: ColumnList }) {
  const { title, id } = column;

  const params = useParams();
  const pathname = usePathname();
  const dashboardId =
    Number(params.dashboardId) || Number(pathname.split("/")[2]);

  const { data, isLoading } = useCardListQuery(id);

  const cardList = data?.cards ?? [];
  const totalCount = data?.totalCount ?? 0;

  return (
    <div className="flex min-w-83.5 flex-col gap-5 max-lg:mx-0 max-lg:w-full">
      <ColumnListHeader
        title={title}
        contentCount={totalCount}
        columnId={id}
        dashboardId={dashboardId}
      />
      {isLoading ? (
        <div className="text-gray-400">로딩 중...</div>
      ) : cardList.length === 0 ? (
        <NoCard />
      ) : (
        cardList.map((colCard) => (
          <Link href={`/card/${colCard.id}`} key={colCard.id}>
            <ColumnCard
              cardTitle={colCard.title}
              duedate={colCard.dueDate}
              tags={colCard.tags}
              creator={colCard.assignee?.nickname}
              creatorImageUrl={colCard.assignee?.profileImageUrl}
              imgSrc={colCard.imageUrl}
            />
          </Link>
        ))
      )}
    </div>
  );
}
