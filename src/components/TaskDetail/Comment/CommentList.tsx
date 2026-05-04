import { startTransition } from "react";

import { revalidate } from "@/actions/revalidate";
import { deleteComment } from "@/api/data";
import type { Comment } from "@/types/api";
import { getFormatDate, getFormatTime } from "@/utils/date";

import { Profile } from "../Profile/Profile";

import type { CommentAction } from "./CommentWrapper";

interface CommentListProps {
  comments: Comment[];
  setOptimisticComments: (action: CommentAction) => void;
  cardId: number;
  dashboardId: number;
}

// TODO: 댓글 수정 기능 추가 필요
export function CommentList({
  comments,
  setOptimisticComments,
  cardId,
  dashboardId,
}: CommentListProps) {
  const handleDeleteComment = (id: number) => {
    startTransition(async () => {
      setOptimisticComments({ type: "delete", id });

      await deleteComment(id);
      revalidate(`/dashboard/${dashboardId}/${cardId}`);
    });
  };

  return (
    <>
      {comments.map(({ id, author, content, createdAt }) => (
        <div key={id} className="flex gap-3">
          <Profile className="h-10 w-10" user={author} />
          <div className="flex flex-1 flex-col items-start justify-center gap-2">
            <div className="flex items-center justify-start gap-1">
              <span className="text-base font-semibold text-gray-100">
                {author.nickname}
              </span>
              <span className="text-sm font-medium text-gray-400">
                {getFormatDate(createdAt)}
              </span>
              <span className="text-sm font-medium text-gray-400">
                {getFormatTime(createdAt)}
              </span>
            </div>
            <span className="flex-1 text-base font-medium whitespace-pre-wrap text-gray-100">
              {content}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 px-2 text-gray-100">
            <button
              className="cursor-pointer"
              onClick={() => handleDeleteComment(id)}
            >
              삭제
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
