"use client";
import Image from "next/image";
import { useRef, useState } from "react";

import icMore from "@/assets/common/ic-more.svg";
import { useClickOutside } from "@/hooks/useClickOutside";

import { PopDoverMenu } from "./PopDoverMenu";

export function KebabButton({
  dashboardId,
  taskId,
}: {
  dashboardId: number;
  taskId: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useClickOutside(containerRef, () => {
    setIsOpen(false);
  });

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
      {isOpen && <PopDoverMenu dashboardId={dashboardId} taskId={taskId} />}
    </div>
  );
}
