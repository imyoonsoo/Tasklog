"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

import icMore from "@/assets/common/ic-more.svg";
import { useClickOutside } from "@/hooks/useClickOutside";

import { PopDoverMenu } from "../PopDoverMenu";

export function KebabButton({
  dashboardId,
  taskId,
}: {
  dashboardId: number;
  taskId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

  const handleEdit = () => {
    setIsOpen(false);
    router.push(`/card/${taskId}/edit`);
  };

  const handleDelete = () => {
    router.replace(`/card/${taskId}/delete?dashboardId=${dashboardId}`);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
    >
      <button
        onClick={handleDropdown}
        className="h-6 w-6 transition-transform hover:scale-110 active:opacity-70"
      >
        <Image src={icMore} height={24} width={24} alt="더보기 아이콘" />
      </button>
      {isOpen && <PopDoverMenu onEdit={handleEdit} onDelete={handleDelete} />}
    </div>
  );
}
