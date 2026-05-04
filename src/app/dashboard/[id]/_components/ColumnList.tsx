"use client";

import { useParams, usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
// [수정] dashboardId 추출을 위해 필요한 훅 추가

import { getCardList } from "@/api/data";

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

interface Assignee {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface GetCardListResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee?: Assignee;
  imageUrl?: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

interface Params {
  columnId: number;
  size: number;
  cursorId?: number;
}

export function ColumnList({ column }: { column: ColumnList }) {
  const { title, id } = column;

  // [수정] dashboardId 추출 로직을 컴포넌트 상단에 배치
  const params = useParams();
  const pathname = usePathname();
  const dashboardId =
    Number(params.dashboardId) || Number(pathname.split("/")[2]);

  const [cardList, setCardList] = useState<GetCardListResponse[]>([]);
  const cursorId = useRef<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalCount, setTotalCount] = useState<number>(0);
  const observerTarget = useRef<HTMLDivElement>(null);

  const fetchCardList = async () => {
    //로딩 중이거나 불러올 데이터가 없다면 그대로 리턴
    if (isLoading || !hasMore) return;

    //처음에 로딩 중으로 세팅
    setIsLoading(true);

    try {
      const params: Params = {
        columnId: id,
        // [수정] 기존 1에서 적절한 사이즈(5)로 변경
        size: 5,
        ...(cursorId.current && { cursorId: cursorId.current }),
      };

      const coldata = await getCardList(params);
      if (coldata && coldata.cards) {
        setTotalCount(coldata.totalCount);
        setCardList((prev) => {
          const updated = [...prev, ...coldata.cards];
          if (updated.length >= coldata.totalCount) {
            setHasMore(false);
          }
          return updated;
        });

        if (coldata.cursorId) {
          cursorId.current = coldata.cursorId;
        }
      }
    } catch (e) {
      console.error("데이터 페칭에러: ", e);
    } finally {
      setIsLoading(false);
    }
  };

  //초기데이터를 넣어주는 useEffect
  useEffect(() => {
    const load = async () => {
      fetchCardList();
    };

    load();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    const options = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (
          entry.isIntersecting &&
          !isLoading &&
          hasMore &&
          cursorId.current != null
        ) {
          await fetchCardList();
        }
      });
    }, options);

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasMore]);

  return (
    <div className="flex min-w-83.5 flex-col gap-5 md:mx-10 lg:mx-0">
      <ColumnListHeader
        title={title}
        contentCount={totalCount}
        columnId={id}
        // [수정] 추출한 dashboardId를 Header에 전달
        dashboardId={dashboardId}
        /**
         * 톱니바퀴 누르면 칼럼 관리로 -> 수정하기/삭제하기 버튼 선택 가능 -> 칼럼 수정/삭제 모달 띄우기
         **/
        //@TODO 컬럼 수정 모달 완성되면 다시연결
        // onSettingClick={handleOpenEdit}
      />
      {cardList.length === 0 ? (
        <NoCard />
      ) : (
        cardList?.map((colCard) => (
          <ColumnCard
            key={colCard.id}
            cardTitle={colCard.title}
            duedate={colCard.dueDate}
            tags={colCard.tags}
            creator={colCard.assignee?.nickname}
            imgSrc={colCard.imageUrl}
          />
        ))
      )}
      {/* observer */}
      <div ref={observerTarget}></div>
    </div>
  );
}
