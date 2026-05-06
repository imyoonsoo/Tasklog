"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  deleteCard,
  getColumnList,
  getCardList,
  getDashboardDetail,
  postCard,
  putCardUpdate,
  getMemberList,
  deleteMember,
  postInvitation,
  putMyInfoUpdate,
} from "@/api/data";
import type {
  CreateCardRequest,
  UpdateCardRequest,
  CreateInvitationRequest,
  UpdateUserRequest,
} from "@/types/api";

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

export const memberKeys = {
  all: ["members"] as const,
  list: (dashboardId: number) =>
    [...memberKeys.all, "list", dashboardId] as const,
};

export function useCardListQuery(columnId: number) {
  return useQuery({
    queryKey: cardKeys.list(columnId),
    queryFn: () => getCardList({ columnId, size: 100 }),
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

export function useMemberListQuery(dashboardId: number) {
  return useQuery({
    queryKey: memberKeys.list(dashboardId),
    queryFn: () => getMemberList({ dashboardId, size: 20 }),
    enabled: !!dashboardId,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: "always",
    refetchInterval: 3000,
  });
}

export function useInviteMemberMutation(dashboardId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvitationRequest) =>
      postInvitation(dashboardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(dashboardId) });
    },
  });
}

export function useDeleteMemberMutation(dashboardId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: number) => deleteMember(memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memberKeys.list(dashboardId) });
    },
  });
}

export function useUpdateMyInfoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateUserRequest) => putMyInfoUpdate(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: memberKeys.all });
      queryClient.invalidateQueries({ queryKey: ["users", "me"] });
    },
  });
}
