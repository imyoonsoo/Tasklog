"use client";
import { startTransition, useState } from "react";

import { createComment } from "@/actions/comment";
import { revalidate } from "@/actions/revalidate";
import { cn } from "@/lib/cn";
import type { User } from "@/types/api";

import { Button } from "../../Button";
import { Profile } from "../Profile/Profile";

import type { CommentAction } from "./CommentWrapper";

export interface CommentFormProps {
  user: User;
  cardId: number;
  columnId: number;
  dashboardId: number;
  setOptimisticComments: (action: CommentAction) => void;
}

export function CommentForm({
  user,
  cardId,
  columnId,
  dashboardId,
  setOptimisticComments,
}: CommentFormProps) {
  const [isExpended, setIsExpended] = useState(false);
  const [content, setContent] = useState("");

  const handleCancelClick = () => {
    setIsExpended(false);
    setContent("");
  };

  const handleCreateComment = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (content.trim() === "") return;

    const formData = new FormData(e.currentTarget);
    formData.append("cardId", String(cardId));
    formData.append("columnId", String(columnId));
    formData.append("dashboardId", String(dashboardId));
    startTransition(async () => {
      setOptimisticComments({
        type: "add",
        data: {
          id: Math.random(),
          cardId,
          content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          author: {
            id: user.id,
            nickname: user.nickname,
            profileImageUrl: user.profileImageUrl ?? "",
          },
        },
      });

      const res = await createComment(formData);

      if (res) {
        setContent("");
        revalidate(`/dashboard/${dashboardId}/${cardId}`);
      }
    });
  };

  return (
    <form
      className="group flex w-full items-center justify-center gap-3"
      onSubmit={handleCreateComment}
    >
      <div className={cn(isExpended && "hidden")}>
        {user && <Profile className="h-10 w-10" user={user} />}
      </div>
      <div className="relative flex w-full items-center">
        <textarea
          className={cn(
            "w-full resize-none border-none bg-transparent px-5 text-base font-medium text-white placeholder:text-gray-400",
            isExpended
              ? "outline-sky-blue custom-scrollbar h-55 overflow-y-auto rounded-[14px] py-5 outline-[1.5px]"
              : "h-10 overflow-y-hidden rounded-full py-2.5 outline-1 outline-gray-400"
          )}
          placeholder="댓글을 남겨보세요"
          onFocus={() => setIsExpended(true)}
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <div
          className={cn(
            "absolute right-5 bottom-5 gap-3.5",
            isExpended ? "flex" : "hidden"
          )}
        >
          <Button
            colorType={"secondary"}
            size={"sm"}
            className="px-4"
            type="button"
            onClick={handleCancelClick}
          >
            취소
          </Button>
          <Button size={"sm"} className="px-5">
            등록
          </Button>
        </div>
      </div>
    </form>
  );
}
