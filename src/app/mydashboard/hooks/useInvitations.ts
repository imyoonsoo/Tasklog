import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getMyInvitationList, putInvitationAnswer } from "@/api/data";
import type * as T from "@/types/api";

interface AnswerVariables {
  // 수락하거나 거절할 초대의 고유 ID
  invitationId: number;

  // API 요청 바디 (inviteAccepted: boolean 포함)
  // T.AnswerInvitationRequest는 보통 { inviteAccepted: boolean } 형태입니다.
  data: T.AnswerInvitationRequest;
}
// hooks/useInvitations.ts
export const invitationKeys = {
  all: ["invitations"] as const,
  list: (searchWord: string) =>
    [...invitationKeys.all, "list", { searchWord }] as const,
};

// 초대 목록을 가져오는 훅 추가
export function useGetInvitations(searchWord: string = "") {
  return useQuery({
    queryKey: invitationKeys.list(searchWord),
    queryFn: () => getMyInvitationList({ title: searchWord }),
  });
}

export function useAcceptInvitationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ invitationId, data }: AnswerVariables) =>
      putInvitationAnswer(invitationId, data),
    onSuccess: () => {
      // 'invitations'로 시작하는 모든 쿼리를 무효화해서 화면을 다시 그리게 함
      queryClient.invalidateQueries({
        queryKey: invitationKeys.all,
        exact: false,
      });
    },
  });
}
