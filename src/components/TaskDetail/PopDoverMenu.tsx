import Image from "next/image";
import { useRouter } from "next/navigation";

import icDelete from "@/assets/common/ic-delete.svg";
import icEdit from "@/assets/common/ic-edit.svg";

interface PopDoverMenuProps {
  dashboardId: number;
  taskId: string;
}

export function PopDoverMenu({ dashboardId, taskId }: PopDoverMenuProps) {
  const router = useRouter();

  const handleEditButtonClick = () => {
    router.push(`/dashboard/${dashboardId}/${taskId}/edit`);
  };

  const handleDeleteButtonClick = () => {
    router.push(`/dashboard/${dashboardId}/${taskId}/delete`);
  };

  return (
    <div className="border-stroke absolute top-5 right-0 mt-2 w-35 rounded-xl border bg-[#2F2F33] shadow-lg">
      <ul className="flex flex-col items-center justify-center text-sm text-gray-700">
        <li
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-t-xl px-5.5 pt-4 pb-2.5 transition-colors duration-300 hover:bg-gray-800"
          onClick={handleEditButtonClick}
        >
          <Image height={20} width={20} src={icEdit} alt="수정 버튼" />
          <span className="text-base text-white">수정하기</span>
        </li>
        <li
          className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-b-xl px-5.5 pt-2.5 pb-4 transition-colors duration-300 hover:bg-gray-800"
          onClick={handleDeleteButtonClick}
        >
          <Image height={20} width={20} src={icDelete} alt="수정 버튼" />
          <span className="text-red text-base">삭제하기</span>
        </li>
      </ul>
    </div>
  );
}
