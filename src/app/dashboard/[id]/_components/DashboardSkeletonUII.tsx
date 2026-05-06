import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // 최상단에 임포트 필요

export function DashboardSkeletonUI() {
  return (
    // 전체 스켈레톤의 다크 테마 색상을 한 번에 지정
    <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
      <div className="flex h-screen w-screen flex-col space-y-12 overflow-hidden bg-[#101010] p-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center gap-6">
          <Skeleton height={64} width="25%" borderRadius="0.75rem" />
        </div>

        <div className="flex items-center gap-5">
          <Skeleton height={48} width={160} borderRadius={9999} />
          <Skeleton height={48} width={224} borderRadius={9999} />
          <Skeleton height={48} width={160} borderRadius={9999} />
        </div>

        <div className="flex grow gap-10 overflow-x-auto pb-6">
          <div className="flex h-full w-105 shrink-0 flex-col space-y-8">
            <div className="flex items-center justify-between px-6">
              <Skeleton height={40} width={144} borderRadius="0.5rem" />
              <div className="flex items-center gap-4">
                <Skeleton height={40} width={40} circle />
                <Skeleton height={40} width={40} borderRadius="0.75rem" />
              </div>
            </div>

            <div className="flex grow flex-col space-y-6 overflow-y-auto pr-2">
              <div className="space-y-6 rounded-3xl border border-gray-700 bg-[#1e1e1e] p-8">
                {/* 카드 내부는 색상이 미세하게 다르므로 baseColor 오버라이드 */}
                <Skeleton
                  height={36}
                  borderRadius="0.75rem"
                  baseColor="#3a3a3a"
                  highlightColor="#4a4a4a"
                />

                <div className="space-y-3">
                  <Skeleton
                    height={20}
                    width="91%"
                    borderRadius="0.5rem"
                    baseColor="#3a3a3a"
                    highlightColor="#4a4a4a"
                  />
                  <Skeleton
                    height={20}
                    width="66%"
                    borderRadius="0.5rem"
                    baseColor="#3a3a3a"
                    highlightColor="#4a4a4a"
                  />
                </div>

                <hr className="border-[#3a3a3a]" />

                <div className="flex items-center gap-4">
                  <Skeleton
                    height={56}
                    width={56}
                    circle
                    baseColor="#3a3a3a"
                    highlightColor="#4a4a4a"
                  />
                  <Skeleton
                    height={28}
                    width={120}
                    borderRadius="0.5rem"
                    baseColor="#3a3a3a"
                    highlightColor="#4a4a4a"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
