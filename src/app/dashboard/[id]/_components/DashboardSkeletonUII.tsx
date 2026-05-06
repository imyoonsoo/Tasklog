export function DashboardSkeletonUI() {
  return (
    <div className="flex h-screen w-screen flex-col space-y-12 overflow-hidden bg-[#101010] p-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* 1. 상단 로고 및 제목 바 (Image 1의 # todjtd) */}
      <div className="flex items-center gap-6">
        <div className="h-16 w-1/4 animate-pulse rounded-xl bg-[#2a2a2a]" />
      </div>

      {/* 2. 필터 및 탭 바 (Image 1의 To do, On progress, Done) */}
      <div className="flex items-center gap-5">
        <div className="h-12 w-40 animate-pulse rounded-full bg-[#2a2a2a]" />
        <div className="h-12 w-56 animate-pulse rounded-full bg-[#2a2a2a]" />
        <div className="h-12 w-40 animate-pulse rounded-full bg-[#2a2a2a]" />
      </div>

      {/* 3. 컬럼 컨테이너 (화면을 꽉 채우기 위해 3개의 컬럼을 배치) */}
      <div className="flex grow gap-10 overflow-x-auto pb-6">
        <div className="flex h-full w-105 shrink-0 flex-col space-y-8">
          {/* 4. 컬럼 헤더 (To do 1, +, gear icons) */}
          <div className="flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-36 animate-pulse rounded-lg bg-[#2a2a2a]" />{" "}
              {/* 컬럼 제목 */}
            </div>
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 animate-pulse rounded-full bg-[#2a2a2a]" />{" "}
              {/* "+" 아이콘 */}
              <div className="h-10 w-10 animate-pulse rounded-xl bg-[#2a2a2a]" />{" "}
              {/* gear 아이콘 */}
            </div>
          </div>

          {/* 5. 태스크 카드 목록 (여러 장의 카드로 컬럼을 채움) */}
          <div className="flex grow flex-col space-y-6 overflow-y-auto pr-2">
            <div className="animate-pulse space-y-6 rounded-3xl border border-gray-700 bg-[#1e1e1e] p-8">
              {/* 카드 내부 콘텐츠 */}
              {/* 태스크 제목 */}
              <div className="h-9 w-full rounded-xl bg-[#3a3a3a]" />

              {/* 추가 설명 / 하위 항목 (선택 사항, 레이아웃을 위해 추가) */}
              <div className="space-y-3">
                <div className="h-5 w-11/12 rounded-lg bg-[#3a3a3a]" />
                <div className="h-5 w-2/3 rounded-lg bg-[#3a3a3a]" />
              </div>

              <hr className="border-[#3a3a3a]" />

              {/* 아바타 및 사용자 이름 */}
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-[#3a3a3a]" />{" "}
                {/* 아바타 */}
                <div className="h-7 w-2/5 rounded-lg bg-[#3a3a3a]" />{" "}
                {/* 사용자 이름 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
