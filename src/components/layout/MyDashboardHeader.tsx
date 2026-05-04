"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import iconSettings from "@/assets/common/ic-setting.svg";
import iconShare from "@/assets/common/ic-user-plus.svg";
import icSideMenu from "@/assets/ic-sidemenu.svg";
import { useSideMenu } from "@/contexts/SideMenuContext";

export function MyDashboardHeader() {
  const { open: handleOpenSideMenu } = useSideMenu();
  const params = useParams();
  const router = useRouter();

  const dashboardId = params?.dashboardId ? Number(params.dashboardId) : null;

  const handleEditClick = () => {
    if (dashboardId) router.push(`/dashboard/${dashboardId}/edit`);
  };

  return (
    <header className="bg-black-900 border-black-800 flex h-12.5 w-full items-center border-b-2 px-3 md:h-15">
      <button onClick={handleOpenSideMenu} className="p-2.5 md:hidden">
        <Image
          src={icSideMenu}
          alt="사이드 메뉴 아이콘"
          height={20}
          width={20}
        />
      </button>
      <div className="bg-black-700 h-6 w-px shrink-0" />

      <div className="flex h-7.5 w-17.5 shrink-0 items-center gap-2.5 md:h-auto md:w-auto md:gap-4">
        <button
          onClick={handleEditClick}
          className="group flex h-7.5 w-7.5 shrink-0 cursor-pointer items-center justify-center text-gray-300 transition hover:text-white md:h-auto md:w-auto md:gap-2 md:py-1.5"
        >
          <Image
            src={iconSettings}
            alt="setting"
            width={16}
            height={16}
            className="opacity-70 group-hover:opacity-100"
          />
          <span className="hidden text-sm font-medium md:inline">관리</span>
        </button>

        <button className="group flex h-7.5 w-7.5 shrink-0 cursor-pointer items-center justify-center text-gray-300 transition hover:text-white md:h-auto md:w-auto md:gap-2 md:py-1.5">
          <Image
            src={iconShare}
            alt="share"
            width={16}
            height={16}
            className="opacity-70 group-hover:opacity-100"
          />
          <span className="hidden text-sm font-medium md:inline">공유</span>
        </button>
      </div>
    </header>
  );
}
