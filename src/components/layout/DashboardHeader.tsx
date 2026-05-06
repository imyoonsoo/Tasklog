"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import { getMemberList } from "@/api/data";
import iconSettings from "@/assets/common/ic-setting.svg";
import iconShare from "@/assets/common/ic-user-plus.svg";
import icSideMenu from "@/assets/ic-sidemenu.svg";
import { useSideMenu } from "@/contexts/SideMenuContext";
import { ProfileImage } from "../profile/Profile";

const PROFILE_COLOR_KEYS = [
  "profile-green",
  "profile-violet",
  "profile-cyan",
  "profile-rose",
  "profile-cobalt",
  "profile-yellow",
  "profile-orange",
];

interface Member {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
  userId: number;
}

export function DashboardHeader() {
  const router = useRouter();
  const params = useParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const { open: handleOpenSideMenu } = useSideMenu();

  const dashboardId = params?.id ? Number(params.id) : null;

  useEffect(() => {
    if (dashboardId === null || isNaN(dashboardId)) return;

    const fetchMembers = async () => {
      try {
        const memberData = await getMemberList({ dashboardId, size: 20 });
        const rawMembers: Member[] = memberData.members || [];

        const uniqueMembers = rawMembers.reduce<Member[]>((acc, current) => {
          const isDuplicate = acc.find(
            (item) => item.userId === current.userId
          );
          if (!isDuplicate) {
            acc.push(current);
          }
          return acc;
        }, []);

        setMembers(uniqueMembers);
        setTotalCount(uniqueMembers.length);
      } catch (error) {
        console.error("헤더 멤버 로드 실패:", error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  const MAX_VISIBLE_MEMBERS = 6;
  const visibleMembers = members.slice(0, MAX_VISIBLE_MEMBERS);
  const extraCount =
    totalCount > MAX_VISIBLE_MEMBERS ? totalCount - MAX_VISIBLE_MEMBERS : 0;

  const membersWithColors = useMemo(() => {
    return visibleMembers.map((member) => ({
      ...member,
      colorKey: PROFILE_COLOR_KEYS[member.id % PROFILE_COLOR_KEYS.length],
    }));
  }, [visibleMembers]);

  if (dashboardId === null || isNaN(dashboardId)) return null;

  const handleEditClick = () => {
    if (dashboardId) router.push(`/dashboard/${dashboardId}/edit`);
  };

  const handleShareClick = () => {
    if (dashboardId) router.push(`/dashboard/${dashboardId}/invite`);
  };

  return (
    <header className="border-black-800 flex h-12.5 w-full items-center justify-between border-b-2 bg-[#1B1A1F] px-3 md:left-55 md:h-15 md:justify-end md:px-6 lg:left-85">
      <button onClick={handleOpenSideMenu} className="p-2.5 md:hidden">
        <Image
          src={icSideMenu}
          alt="사이드 메뉴 아이콘"
          height={20}
          width={20}
        />
      </button>
      <div className="flex items-center gap-6 md:gap-8.5 lg:gap-12.5">
        <div className="flex h-6 w-19.75 items-center md:h-8.5 md:w-auto">
          {membersWithColors.map((member, index) => (
            <div
              key={member.id}
              className={`border-black-900 relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${index !== 0 ? "-ml-2" : ""} md:h-8.5 md:w-8.5 ${index !== 0 ? "md:-ml-3.25" : ""} cursor-pointer hover:z-20 hover:-translate-y-1 hover:border-white`}
            >
              <ProfileImage
                name={member.nickname}
                imageUrl={member.profileImageUrl}
              />
            </div>
          ))}

          {extraCount > 0 && (
            <div className="border-black-900 z-10 -ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-pink-100 text-[10px] font-bold text-pink-500 md:-ml-3.25 md:h-8.5 md:w-8.5 md:text-[12px]">
              +{extraCount}
            </div>
          )}
        </div>

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

          <button
            onClick={handleShareClick}
            className="group flex h-7.5 w-7.5 shrink-0 cursor-pointer items-center justify-center text-gray-300 transition hover:text-white md:h-auto md:w-auto md:gap-2 md:py-1.5"
          >
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
      </div>
    </header>
  );
}
