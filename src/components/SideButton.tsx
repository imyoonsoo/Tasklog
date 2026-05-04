import Image from "next/image";
import { useRouter } from "next/navigation";

import icCrown from "@/assets/common/ic-crown.svg";
import colorChipsBlue from "@/assets/dashboard/colorchips-blue.svg";
import colorChipsGreen from "@/assets/dashboard/colorchips-green.svg";
import colorChipsOrange from "@/assets/dashboard/colorchips-orange.svg";
import colorChipsRed from "@/assets/dashboard/colorchips-red.svg";
import colorChipsYellow from "@/assets/dashboard/colorchips-yellow.svg";

const CHIP_IMAGE_MAP: Record<string, string> = {
  "#206e4e": colorChipsGreen,
  "#ae2e24": colorChipsRed,
  "#1458bc": colorChipsBlue,
  "#bd8c00": colorChipsYellow,
  "#9f4b00": colorChipsOrange,
};

interface SideButtonProps {
  id: number;
  title: string;
  color: string;
  createdByMe: boolean;
}

export function SideButton({ id, title, color, createdByMe }: SideButtonProps) {
  const chipSrc = CHIP_IMAGE_MAP[color] || colorChipsGreen;
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/dashboard/${id}`)}
      className="flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-4 transition-colors duration-300 ease-in-out hover:bg-[#2C2B30]"
    >
      <div className="flex items-center justify-center gap-2">
        <Image height={24} width={24} src={chipSrc} alt={`${color} 컬러칩`} />
        <span className="text-white">{title}</span>
      </div>
      {createdByMe && <Image className="h-6" src={icCrown} alt="왕관 아이콘" />}
    </div>
  );
}
