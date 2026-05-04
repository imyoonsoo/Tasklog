"use client";
import { useOptimistic } from "react";

import type { Comment, User } from "@/types/api";

import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export type CommentAction =
  | { type: "add"; data: Comment }
  | { type: "update"; id: number; content: Partial<Comment> }
  | { type: "delete"; id: number };

interface CommentWrapperProps {
  initialComments: Comment[];
  user: User;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export function CommentWrapper({
  initialComments,
  user,
  cardId,
  columnId,
  dashboardId,
}: CommentWrapperProps) {
  const [optimisticComments, setOptimisticComments] = useOptimistic<
    Comment[],
    CommentAction
  >(initialComments, (state, action) => {
    switch (action.type) {
      case "add":
        return [action.data, ...state];
      case "update":
        return state.map((comment) =>
          comment.id === action.id ? { ...comment, ...action.content } : comment
        );
      case "delete":
        return state.filter((comment) => comment.id !== action.id);
      default:
        return state;
    }
  });

  return (
    <div className="flex flex-col gap-5 border-t-2 border-[#4D4B54] pt-7.5 max-lg:contents md:gap-6">
      <CommentForm
        user={user}
        setOptimisticComments={setOptimisticComments}
        cardId={cardId}
        columnId={columnId}
        dashboardId={dashboardId}
      />
      <CommentList
        comments={optimisticComments}
        setOptimisticComments={setOptimisticComments}
        cardId={cardId}
        dashboardId={dashboardId}
      />
    </div>
  );
}
