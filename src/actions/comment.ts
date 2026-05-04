"use server";

import { postComment } from "@/api/data";

export async function createComment(formData: FormData) {
  const content = String(formData.get("content"));
  const cardId = Number(formData.get("cardId"));
  const columnId = Number(formData.get("columnId"));
  const dashboardId = Number(formData.get("dashboardId"));

  const data = {
    content,
    cardId,
    dashboardId,
    columnId,
  };

  if (!cardId || !columnId || !dashboardId || !content) {
    return;
  }

  const res = await postComment(data);

  return res;
}
