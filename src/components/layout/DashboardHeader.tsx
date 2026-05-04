"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";

import { getMemberList } from "@/api/data";
import iconSettings from "@/assets/common/ic-setting.svg";
import iconShare from "@/assets/common/ic-user-plus.svg";
import { Member } from "@/types/api";

const PROFILE_COLOR_KEYS = [
  "profile-green",
  "profile-violet",
  "profile-cyan",
  "profile-rose",
  "profile-cobalt",
  "profile-yellow",
  "profile-orange",
];

export function DashboardHeader() {
  const router = useRouter();
  const params = useParams();

  // 1. 헤더 내부에서 관리할 멤버 데이터 상태
  const [members, setMembers] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  // 현재 주소의 [id] 값을 숫자로 변환하여 가져옵니다.
  const dashboardId = params?.id ? Number(params.id) : null;

  // 2. 대시보드 ID가 바뀔 때마다 멤버 데이터를 새로 불러옵니다.
  useEffect(() => {
    const fetchMembers = async () => {
      if (!dashboardId || isNaN(dashboardId)) return;
      try {
        const memberData = await getMemberList({ dashboardId, size: 20 });
        setMembers(memberData.members || []);
        setTotalCount(memberData.totalCount || 0);
      } catch (error) {
        console.error("헤더 멤버 로드 실패:", error);
      }
    };

    fetchMembers();
  }, [dashboardId]);

  const handleEditClick = () => {
    if (dashboardId) {
      router.push(`/dashboard/${dashboardId}/edit`);
    }
  };

  const handleInviteClick = () => {
    if (dashboardId) {
      router.push(`/dashboard/${dashboardId}/edit/invite`);
    }
  };

  const MAX_VISIBLE_MEMBERS = 4;
  const visibleMembers = useMemo(
    () => (members || []).slice(0, MAX_VISIBLE_MEMBERS),
    [members]
  );
  const extraCount =
    totalCount > MAX_VISIBLE_MEMBERS ? totalCount - MAX_VISIBLE_MEMBERS : 0;

  const membersWithColors = useMemo(() => {
    return visibleMembers.map((member) => ({
      ...member,
      colorKey: PROFILE_COLOR_KEYS[member.id % PROFILE_COLOR_KEYS.length],
    }));
  }, [visibleMembers]);

  return (
    <div className="border-black-800 bg-black-900 flex h-12.5 w-full items-center justify-between border-b-2 px-3 md:h-15 md:justify-end md:px-6">
      {/* 모바일 여백 */}
      <div className="flex-1 md:hidden" />

      <div className="flex items-center gap-7.5 md:gap-8.5 lg:gap-12.5">
        {/* 아바타 그룹 */}
        <div className="flex items-center">
          {membersWithColors.map((member, index) => (
            <div
              key={member.id}
              style={{
                backgroundColor:
                  !member.profileImageUrl || member.profileImageUrl === "string"
                    ? `var(--color-${member.colorKey})`
                    : "transparent",
              }}
              className={`border-black-900 relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                index !== 0 ? "-ml-2" : ""
              } md:h-8.5 md:w-8.5 ${index !== 0 ? "md:-ml-3.25" : ""} cursor-pointer overflow-hidden hover:z-20 hover:-translate-y-1 hover:border-white`}
            >
              {member.profileImageUrl && member.profileImageUrl !== "string" ? (
                <Image
                  src={member.profileImageUrl}
                  alt={`${member.nickname} profile`}
                  fill
                  sizes="34px"
                  className="object-cover"
                />
              ) : (
                <span className="text-[8px] font-medium text-white md:text-[11px]">
                  {member.nickname.slice(0, 2)}
                </span>
              )}
            </div>
          ))}

          {extraCount > 0 && (
            <div className="border-black-900 z-10 -ml-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-pink-100 text-[10px] font-bold text-pink-500 md:-ml-3.25 md:h-8.5 md:w-8.5 md:text-[12px]">
              +{extraCount}
            </div>
          )}
        </div>

        <div className="bg-black-700 h-6 w-px shrink-0" />

        <div className="flex h-7.5 shrink-0 items-center gap-2.5 md:h-auto md:w-auto md:gap-4">
          <button
            onClick={handleEditClick}
            className="group flex h-7.5 items-center justify-center text-gray-300 transition hover:text-white md:gap-2"
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
            onClick={handleInviteClick}
            className="group flex h-7.5 items-center justify-center text-gray-300 transition hover:text-white md:gap-2"
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
    </div>
  );
}
