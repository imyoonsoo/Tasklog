"use client";

import { useParams, useRouter } from "next/navigation";

import { TaskEditContainer } from "@/app/dashboard/[id]/_components/TaskEditContainer";
import { Modal } from "@/components/modal/Modal";
import { ModalCloseButton } from "@/components/modal/ModalCloseButton";

export default function TaskEditModalPage() {
  const params = useParams();
  const router = useRouter();
  const cardId = Number(params.cardId);

  return (
    <Modal>
      <div
        onMouseDown={(e) => e.stopPropagation()}
        className="fixed top-1/2 left-1/2 z-100 flex h-full max-h-205 w-full max-w-93.75 -translate-x-1/2 -translate-y-1/2 flex-col overflow-y-auto bg-[#1B1A1F] p-5 text-white shadow-2xl [scrollbar-width:none] md:h-auto md:min-h-190 md:w-135 md:max-w-none md:rounded-3xl md:border md:border-[#333] md:p-7 [&::-webkit-scrollbar]:hidden"
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold">할 일 수정</h2>
          <ModalCloseButton />
        </div>

        <TaskEditContainer cardId={cardId} onCancel={() => router.back()} />
      </div>
    </Modal>
  );
}
