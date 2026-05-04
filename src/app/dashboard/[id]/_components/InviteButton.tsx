import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import icUserPlus from "@/assets/ic-user-plus-white.svg";

export function InviteButton() {
  const params = useParams();
  const dashboardId = params.id;

  return (
    <Link href={`/dashboard/${dashboardId}/invite`}>
      <div className="bg-brand-500 flex h-7.25 w-16.25 items-center justify-center gap-0.5 rounded-full">
        <span className="text-sm font-semibold text-white">초대</span>
        <Image src={icUserPlus} height={14} width={14} alt="초대하기 아이콘" />
      </div>
    </Link>
  );
}
