"use client";

import { useParams, useRouter } from "next/navigation";

import { TaskEditContainer } from "@/app/dashboard/[id]/_components/TaskEditContainer";
import { ModalCloseButton } from "@/components/modal/ModalCloseButton";

export default function TaskEditPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = Number(params.cardId);

  return (
    <div className="bg-modal-background fixed top-1/2 left-1/2 z-100 flex h-full max-h-203 w-full max-w-93.75 -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto p-5 text-white shadow-2xl [scrollbar-width:none] md:h-auto md:max-h-[calc(100vh-100px)] md:w-126.5 md:max-w-none md:rounded-3xl md:border md:border-[#333] md:p-7 lg:max-h-[calc(100vh-128px)] lg:w-150 lg:p-7.5 [&::-webkit-scrollbar]:hidden">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold">할 일 수정</h2>
        <ModalCloseButton />
      </div>

      <TaskEditContainer cardId={cardId} onCancel={() => router.back()} />
    </div>
  );
}
