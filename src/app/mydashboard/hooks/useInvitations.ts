import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getMyInvitationList, putInvitationAnswer } from "@/api/data";
import type * as T from "@/types/api";

interface AnswerVariables {
  invitationId: number;
  data: T.AnswerInvitationRequest;
}

export const invitationKeys = {
  all: ["invitations"] as const,
  list: (searchWord: string) =>
    [...invitationKeys.all, "list", { searchWord }] as const,
};

// 초대 목록을 가져오는 훅 추가
export function useGetInvitations(searchWord: string = "") {
  return useInfiniteQuery({
    queryKey: invitationKeys.list(searchWord),
    queryFn: ({ pageParam }) =>
      getMyInvitationList({
        title: searchWord,
        cursorId: pageParam, // API에서 cursorId를 지원한다고 가정
      }),
    initialPageParam: undefined as number | undefined, // 첫 페이지의 cursorId
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined, // 다음 페이지를 위한 ID 반환
  });
}

export function useAcceptInvitationMutation() {
  const queryClient = useQueryClient();

  //서버의 데이터를 변경하기 위해서....
  return useMutation({
    mutationFn: ({ invitationId, data }: AnswerVariables) =>
      putInvitationAnswer(invitationId, data),

    //서버의 데이터 변경이 성공하면 할 일
    onSuccess: () => {
      // 'invitations'로 시작하는 모든 쿼리를 무효화
      queryClient.invalidateQueries({
        queryKey: invitationKeys.all,
        exact: false,
      });
    },
  });
}
