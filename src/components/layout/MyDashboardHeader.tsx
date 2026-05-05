"use client";

import Image from "next/image";

import icSideMenu from "@/assets/ic-sidemenu.svg";
import { useSideMenu } from "@/contexts/SideMenuContext";

export function MyDashboardHeader() {
  const { open: handleOpenSideMenu } = useSideMenu();

  return (
    <header className="border-black-800 flex h-12.5 w-full items-center gap-7.5 border-b-2 bg-[#1B1A1F] px-3 max-md:justify-start md:h-15 md:px-6">
      <button onClick={handleOpenSideMenu} className="p-2.5 md:hidden">
        <Image
          src={icSideMenu}
          alt="사이드 메뉴 아이콘"
          height={20}
          width={20}
        />
      </button>
    </header>
  );
}
