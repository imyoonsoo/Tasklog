import Image from "next/image";
import Link from "next/link";

import chartIcon from "@/assets/mydashboard/chart.svg";
import mailIcon from "@/assets/mydashboard/MailIcon.svg";
import { Button } from "@/components/Button";

interface DashboardProps {
  dashtype: "my" | "invite";
}

export function Emptydashboard({ dashtype }: DashboardProps) {
  return (
    <div className="bg-black-800 flex h-fit w-full flex-col items-center justify-center gap-1 rounded-2xl border border-gray-700 py-5 md:gap-2 md:px-10 lg:gap-2.5 lg:py-10">
      {dashtype === "my" ? (
        <Image
          className="h-15 w-15 md:h-20 md:w-20 lg:h-25 lg:w-25"
          sizes="(max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
          src={chartIcon}
          alt="chartIcon"
        />
      ) : (
        <Image
          className="h-20.25 w-11.75 md:h-20 md:w-20 lg:h-25 lg:w-25"
          src={mailIcon}
          alt="mailIcon"
        />
      )}
      <div className="md:text-md text-sm text-gray-400 lg:text-lg">
        {dashtype === "my"
          ? "대시보드가 없습니다"
          : "아직 초대받은 대시보드가 없습니다."}
      </div>
      {/* @TODO 버튼은 공통 컴포넌트로 수정 필요 */}
      {dashtype === "my" && (
        <Link href={`/new-dashboard`}>
          <Button colorType="secondary" size="sm" className="px-2">
            <div className="flex items-center gap-1">
              생성하기
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-300 text-gray-700">
                +
              </div>
            </div>
          </Button>
        </Link>
      )}
    </div>
  );
}
