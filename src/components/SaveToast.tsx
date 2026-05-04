"use client";

interface ToastProps {
  onSave: () => void;
  isLoading?: boolean;
}

export function SaveToast({ onSave: handleSave, isLoading }: ToastProps) {
  return (
    <div className="fixed bottom-10 left-1/2 z-100 flex w-[90%] max-w-130 -translate-x-1/2 items-center justify-between gap-6 rounded-full border border-white/10 bg-gray-900/95 px-6 py-4 shadow-2xl backdrop-blur-sm md:w-auto md:min-w-120">
      {/* 왼쪽: 녹색 도트 애니메이션 및 메시지 */}
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          {/* 퍼지는 효과 (Ping) */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
          {/* 고정된 점 */}
          <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
        </div>
        <p className="text-sm font-semibold break-keep text-white md:text-base">
          저장하지 않은 변경 사항이 있어요!
        </p>
      </div>

      {/* 오른쪽: 저장 버튼 */}
      <button
        onClick={handleSave}
        disabled={isLoading}
        className="flex min-w-30 items-center justify-center rounded-xl bg-green-600 px-5 py-2 text-sm font-bold text-white transition-all hover:bg-green-500 active:scale-95 disabled:opacity-50 md:px-6 md:py-2.5"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>저장 중</span>
          </div>
        ) : (
          "변경사항 저장하기"
        )}
      </button>
    </div>
  );
}
