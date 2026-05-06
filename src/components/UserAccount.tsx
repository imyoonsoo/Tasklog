"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

import { getMyInfo } from "@/api/data";
import icSetting from "@/assets/common/ic-setting.svg";
import { ProfileWrapper } from "./profile/Profile";

export function UserAccount() {
  const { data: myInfo } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
  });

  const nickname = myInfo?.nickname || "";
  const profileImageUrl = myInfo?.profileImageUrl || null;

  return (
    <div className="flex items-center justify-between border-t-2 border-[#2C2B30] px-7.5 py-3 text-gray-100">
      <ProfileWrapper name={nickname} imageUrl={profileImageUrl} />
      <Link href={"/account-setting"}>
        <Image src={icSetting} height={20} width={20} alt="설정 아이콘" />
      </Link>
    </div>
  );
}
