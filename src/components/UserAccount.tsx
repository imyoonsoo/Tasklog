"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { getMyInfo } from "@/api/data";
import icSetting from "@/assets/common/ic-setting.svg";

export function UserAccount() {
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const nickname = myInfo?.nickname || "";
  const profileImageUrl = myInfo?.profileImageUrl || null;

  return (
    <div className="flex items-center justify-between border-t-2 border-[#2C2B30] px-7.5 py-3 text-gray-100">
      <div className="justify-cente flex items-center gap-2">
        <div className="bg-profile-green relative flex h-7.5 w-7.5 items-center justify-center rounded-2xl">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              fill
              alt="프로필 이미지"
              className="rounded-full object-cover"
            />
          ) : (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12px] font-semibold whitespace-nowrap text-white">
              {nickname.slice(0, 2)}
            </span>
          )}
        </div>
        <span>{nickname}</span>
      </div>
      <Link href={"/account-setting"}>
        <Image src={icSetting} height={20} width={20} alt="설정 아이콘" />
      </Link>
    </div>
  );
}
