import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { getMyInvitationList, putInvitationAnswer } from "@/api/data";
import type * as T from "@/types/api";

// 쿼리 키 :: 서버에서 가져올 데이터를 보관할 고유한 주소
export const invitationKeys = {
  all: ["invitations"] as const,
  list: (searchWord: string) =>
    [...invitationKeys.all, "list", searchWord] as const,
};

export function useInvitationListInfiniteQuery(searchWord: string = "") {
  return useInfiniteQuery({
    queryKey: invitationKeys.list(searchWord),
    queryFn: async ({ pageParam }) => {
      const { invitations } = await getMyInvitationList({
        size: 2,
        cursorId: pageParam,
        title: searchWord === "" ? undefined : searchWord,
      });
      return invitations;
    },
    initialPageParam: undefined as number | undefined,

    // 네가 구현했던 hasMore 로직을 여기서 알아서 처리함
    getNextPageParam: (lastPage) => {
      // 가져온 데이터가 없거나 2개 미만이면 끝(null 반환)
      if (lastPage.length === 0) return undefined;
      // 다음 페이지를 부를 때 쓸 cursorId(마지막 요소의 id) 반환
      return lastPage[lastPage.length - 1].id;
    },
  });
}
interface AnswerVariables {
  invitationId: number;
  data: T.AnswerInvitationRequest;
}

export function useAcceptInvitationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ invitationId, data }: AnswerVariables) =>
      putInvitationAnswer(invitationId, data),
    onSuccess: () => {
      // 핵심: 초대 목록 쿼리키를 무효화해서 알아서 최신 데이터로 새로고침하게 만듦
      queryClient.invalidateQueries({ queryKey: invitationKeys.all });

      // 수락했으니 '내 대시보드' 목록에도 추가되어야 함. 내 대시보드 키가 있다면 같이 무효화.
      // queryClient.invalidateQueries({ queryKey: dashboardKeys.all });
    },
  });
}
