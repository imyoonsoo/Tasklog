"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useRef } from "react";

import { getDashboardList } from "@/api/data";

import { SideButton } from "./SideButton";
import { Dashboard } from "./SideMenu";

const PAGE_SIZE = 20;

export function SideDashboardList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["dashboards"],
      queryFn: ({ pageParam = 1 }) =>
        getDashboardList({
          navigationMethod: "pagination",
          page: pageParam,
          size: PAGE_SIZE,
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const fetched = allPages.length * PAGE_SIZE;
        return fetched < lastPage.totalCount ? allPages.length + 1 : undefined;
      },
    });

  const observerInstanceRef = useRef<IntersectionObserver | null>(null);

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerInstanceRef.current) observerInstanceRef.current.disconnect();
      if (!node || !hasNextPage || isFetchingNextPage) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) fetchNextPage();
        },
        { threshold: 0.1 }
      );
      observer.observe(node);
      observerInstanceRef.current = observer;
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const dashboards: Dashboard[] =
    data?.pages.flatMap((page) => page.dashboards) ?? [];

  return (
    <div className="flex h-full flex-col overflow-y-auto px-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent">
      <div className="flex flex-col gap-1">
        {isLoading && (
          <div className="flex h-10 items-center justify-center">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
          </div>
        )}

        {dashboards.map((item) => (
          <SideButton
            key={item.id}
            id={item.id}
            title={item.title}
            color={item.color}
            createdByMe={item.createdByMe}
          />
        ))}

        {hasNextPage && (
          <div
            ref={observerRef}
            className="flex h-10 w-full items-center justify-center py-4"
          >
            {isFetchingNextPage && (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            )}
          </div>
        )}

        {!isLoading && dashboards.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">
            대시보드가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
