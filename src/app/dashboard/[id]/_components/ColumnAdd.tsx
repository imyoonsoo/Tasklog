import Image from "next/image";

import plusBtn from "@/assets/common/ic-plus.svg";

export function ColumnAdd() {
  return (
    <div className="bg-black-700 hidden h-15 min-w-80 gap-2 rounded-[18px] px-3.5 py-4 lg:flex">
      <Image src={plusBtn} alt="새로운 컬럼 추가 버튼" height={20} width={20} />
      <div className="pl-1 text-[18px] font-medium text-gray-400">
        새로운 컬럼 추가
      </div>
    </div>
  );
}
