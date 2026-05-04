"use client";
import Image from "next/image";

import logoImg from "@/assets/common/logo.svg";
import { useSideMenu } from "@/contexts/SideMenuContext";

import { DashboardAddButton } from "./DashboardAddButton";
import { SideDashboardList } from "./SideDashboardList";
import { SideHomeButton } from "./SideHomeButton";
import { UserAccount } from "./UserAccount";

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export function SideMenu() {
  const { isOpen, close: handleCloseSideMenu } = useSideMenu();
  return (
    <>
      <div
        onClick={handleCloseSideMenu}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`bg-black-900 max-md:duration-00 fixed top-0 left-0 z-30 flex h-screen w-[clamp(220px,20vw,340px)] flex-col pt-2.5 transition-transform md:relative md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-11 items-start px-4 text-2xl text-gray-100">
          <Image src={logoImg} height={40} width={156} alt="로고 이미지" />
        </div>
        <div className="flex flex-1 flex-col overflow-hidden px-6 max-lg:px-2.5">
          <div className="flex min-h-0 flex-1 flex-col">
            <DashboardAddButton />
            <SideHomeButton />
            <div className="min-h-0 flex-1 text-gray-100">
              <SideDashboardList />
            </div>
          </div>
        </div>
        <UserAccount />
      </div>
    </>
  );
}
