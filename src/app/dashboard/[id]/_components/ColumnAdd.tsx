"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import plusBtn from "@/assets/common/ic-plus.svg";

export function ColumnAdd() {
  const { id } = useParams();
  return (
    <Link href={`/${id}/column-add`}>
      <div className="bg-black-700 flex h-15 min-w-80 gap-2 rounded-[18px] px-3.5 py-4">
        <Image src={plusBtn} alt="새로운 컬럼 추가 버튼" />
        <div className="pl-1 text-[18px] font-medium text-gray-400">
          새로운 컬럼 추가
        </div>
      </div>
    </Link>
  );
}
