"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteCard,
  getColumnList,
  getCardList,
  getDashboardDetail,
  postCard,
  putCardUpdate,
} from "@/api/data";
import type { CreateCardRequest, UpdateCardRequest } from "@/types/api";

// get요청을 보낼때는 useQuery를 사용하고, 서버에서 데이터를 들고오는 훅에 적용한다.
// 쿼리키는 전역적으로 보관하고 있는 useQuery의 요청결과를 보관하는데 씁니다.
// post put delete를 할때는 useMutation을 사용한다.
// 요청이 성공했으면 유저에게 변경값을 보내주기 위해서 관련 get요청을 다시 받아올수 있도록
// invalidateQueries를 요청하게 합니다.

export const cardKeys = {
  all: ["cards"] as const,
  list: (columnId: number) => [...cardKeys.all, "list", columnId] as const,
};

export const dashboardKeys = {
  detail: (dashboardId: number) =>
    ["dashboard", "detail", dashboardId] as const,
  columns: (dashboardId: number) =>
    ["dashboard", "columns", dashboardId] as const,
};

export function useCardListQuery(columnId: number) {
  return useQuery({
    queryKey: cardKeys.list(columnId),
    queryFn: () => getCardList({ columnId, size: 100 }),
    // 쿼리 펑션이 실행되는 조건을 의미합니다. 조건이 falsy이면 쿼리는 실행되지 않습니다.
    enabled: !!columnId,
  });
}

export function useDashboardDetailQuery(dashboardId: number) {
  return useQuery({
    queryKey: dashboardKeys.detail(dashboardId),
    queryFn: () => getDashboardDetail(dashboardId),
    enabled: !!dashboardId,
  });
}

export function useColumnListQuery(dashboardId: number) {
  return useQuery({
    queryKey: dashboardKeys.columns(dashboardId),
    queryFn: () => getColumnList(dashboardId),
    enabled: !!dashboardId,
  });
}

export function useCreateCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCardRequest) => postCard(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: cardKeys.list(variables.columnId),
      });
      queryClient.invalidateQueries({
        queryKey: dashboardKeys.columns(variables.dashboardId),
      });
    },
  });
}

export function useUpdateCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      cardId,
      data,
    }: {
      cardId: number;
      data: UpdateCardRequest;
    }) => putCardUpdate(cardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKeys.all });
    },
  });
}

export function useDeleteCardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cardId: number) => deleteCard(cardId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardKeys.all });
    },
  });
}
