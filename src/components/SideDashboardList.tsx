"use client";

import { useState, useRef, useCallback, useEffect } from "react";

import { getDashboardList } from "@/api/data";

import { SideButton } from "./SideButton";
import { Dashboard } from "./SideMenu";

const cache: {
  dashboards: Dashboard[];
  hasMore: boolean;
  page: number;
} = {
  dashboards: [],
  hasMore: true,
  page: 1,
};

export function SideDashboardList() {
  const [dashboards, setDashboards] = useState<Dashboard[]>(cache.dashboards);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(cache.hasMore);

  const isLoadingRef = useRef(false);
  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  const fetchDashboards = useCallback(async (page: number) => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const response = await getDashboardList({
        navigationMethod: "pagination",
        page,
        size: 20,
      });

      const next =
        page === 1
          ? response.dashboards
          : [...cache.dashboards, ...response.dashboards];

      cache.dashboards = next;
      cache.hasMore = page * 20 < response.totalCount;
      cache.page = page;

      setDashboards(next);
      setHasMore(cache.hasMore);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (cache.dashboards.length === 0) {
      (async () => {
        await fetchDashboards(1);
      })();
    }
  }, [fetchDashboards]);

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerInstanceRef.current) observerInstanceRef.current.disconnect();
      if (!node || !hasMore || isLoading) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            fetchDashboards(cache.page + 1);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      observerInstanceRef.current = observer;
    },
    [fetchDashboards, hasMore, isLoading]
  );

  return (
    <div className="flex h-full flex-col overflow-y-auto px-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent">
      <div className="flex flex-col gap-1">
        {dashboards.map((item) => (
          <SideButton
            key={item.id}
            id={item.id}
            title={item.title}
            color={item.color}
            createdByMe={item.createdByMe}
          />
        ))}

        {hasMore && (
          <div
            ref={observerRef}
            className="flex h-10 w-full items-center justify-center py-4"
          >
            {isLoading && (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            )}
          </div>
        )}

        {!hasMore && dashboards.length === 0 && !isLoading && (
          <p className="py-10 text-center text-sm text-gray-400">
            대시보드가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
