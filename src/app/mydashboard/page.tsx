"use client";
import { useEffect, useRef, useState } from "react";

import { getDashboardList, getMyInvitationList } from "@/api/data";
import { Input } from "@/components/input/input";
import * as T from "@/types/api";

import { Emptydashboard } from "./_components/Emptydashboard";
import { InvitionContainer } from "./_components/InvitionContainer";
import { MydashContainer } from "./_components/MydashContainer";
import { SearchNoResult } from "./_components/SearchNoResult";

export interface DashboardList {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}
export const SIZE = 10;

export default function MyDashboard() {
  const [invitaionList, setInvitationList] = useState<T.Invitation[]>([]);
  // const [searchInvited, setSearchInvited] = useState<T.Invitation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [dashboardList, setDashboardList] = useState<DashboardList[]>([]);
  const targetdiv = useRef(null);

  const [total, setTotal] = useState<number>(0);
  const [loadPage, setLoadPage] = useState<number>(1);

  //데이터를 불러오는 함수
  const onNeedsMoreData = async () => {
    const fetchdata = await getDashboardList({
      navigationMethod: "pagination",
      page: loadPage,
      size: SIZE,
    });

    setDashboardList((prev) => {
      const combined = [...prev, ...fetchdata.dashboards];

      const uniqueData = [
        ...new Map(
          combined.map((item: DashboardList) => [item.id, item])
        ).values(),
      ];
      return uniqueData;
    });
    setTotal(fetchdata.totalCount);
    setLoadPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchInitialDash = async () => {
      const fetchdata = await getDashboardList({
        navigationMethod: "pagination",
        page: 1,
        size: SIZE,
      });

      setDashboardList(fetchdata.dashboards);
      setTotal(fetchdata.totalCount);
      setLoadPage(2);
    };

    fetchInitialDash();
  }, []);

  //======================================================================

  //데이터 가져올 함수 정의
  const fetchInvitionList = async () => {
    if (isLoading || !hasMore) {
      return;
    }
    setIsLoading(true);

    try {
      const lastInvitationId = invitaionList[invitaionList.length - 1]?.id;
      const { invitations } = await getMyInvitationList({
        size: 2,
        cursorId: lastInvitationId,
      });

      if (invitations.length === 0) {
        setHasMore(false);
      } else {
        setInvitationList((prev) => [...prev, ...invitations]);
      }
    } catch {
      console.error("에러발생");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    //관찰하는 요소에 변화가 생기면 실행할 콜백함수
    const onIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          //데이터 불러오기
          fetchInvitionList();
        }
      });
    };

    //옵션 설정
    const options = {
      threshold: 0.5,
    };
    //생성자 함수로 관찰자 초기화
    const observer = new IntersectionObserver(onIntersection, options);

    if (targetdiv.current) {
      observer.observe(targetdiv.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, hasMore]);

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) setError("");
  };

  const handleFieldBlur = () => {
    if (value.length < 3) {
      setError("검색 글자 수는 3글자 이상이어야 합니다.");
    }
  };

  //검색어로 데이터 가져오는 함수
  const handleSearchInvited = async () => {
    const result = await getMyInvitationList({ title: value });
    return result;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await handleSearchInvited();
    setInvitationList(result.invitations);
  };

  return (
    <div className="font-pretendard flex flex-col gap-2.5 px-5 text-gray-100">
      <h1 className="pt-3.5 text-4xl font-bold">홈</h1>
      <div className="gap-3">
        <h2 className="py-1 text-lg font-bold md:text-[18px] lg:text-xl">
          내 대시보드
        </h2>
        {dashboardList.length !== 0 ? (
          <MydashContainer
            data={dashboardList}
            total={total}
            loadPage={loadPage}
            handleNeedsMoreData={onNeedsMoreData}
          />
        ) : (
          <Emptydashboard dashtype="my" />
        )}
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <h2 className="flex flex-col py-1 text-lg font-bold md:text-[18px] lg:text-xl">
            초대받은 대시보드
          </h2>
          <div>
            {(invitaionList.length !== 0 || value.length !== 0) && (
              <form onSubmit={handleSubmit}>
                <Input>
                  <Input.Wrapper>
                    <Input.SearchIcon />
                    <Input.Field
                      id="invitedSearch"
                      placeholder="검색"
                      value={value}
                      onChange={handleFieldChange}
                      onBlur={handleFieldBlur}
                    />
                  </Input.Wrapper>
                  <Input.Error />
                </Input>
              </form>
            )}
          </div>
        </div>
        {invitaionList.length === 0 ? (
          value === "" ? (
            <Emptydashboard dashtype="invite" />
          ) : (
            <SearchNoResult />
          )
        ) : (
          <InvitionContainer invitedData={invitaionList} />
        )}
      </div>
      <div ref={targetdiv}></div>
    </div>
  );
}
