import React, { useState, useRef, useEffect } from "react";

export function FlowbiteDatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(
    value ? new Date(value) : new Date()
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 달력 계산 데이터
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const prevDays = Array.from(
    { length: firstDayOfMonth },
    (_, i) => prevMonthLastDate - firstDayOfMonth + i + 1
  );

  const handleDateSelect = (day: number) => {
    const selected = new Date(year, month, day, 12); // 시간대 이슈 방지
    onChange(selected.toISOString().split("T")[0]); // YYYY-MM-DD 형식
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* --- Input 영역 (Flowbite Design) --- */}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="h-4 w-4 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
          </svg>
        </div>
        <input
          readOnly
          value={value || ""}
          placeholder="Select date"
          className="border-black-800 block w-full cursor-pointer rounded-lg border bg-[#201F23] p-3 ps-10 text-sm text-white transition-all outline-none focus:border-violet-500 focus:ring-violet-500"
        />
      </div>

      {/* --- 달력 팝업 (Flowbite 스타일 재현) --- */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-[320px] rounded-lg border border-gray-700 bg-[#1F2937] p-4 shadow-xl">
          {/* 헤더: 년/월 이동 */}
          <div className="mb-4 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month - 1))}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-white">
              {year}년 {month + 1}월
            </span>
            <button
              type="button"
              onClick={() => setViewDate(new Date(year, month + 1))}
              className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* 요일 표시 */}
          <div className="mb-1 grid grid-cols-7">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <span
                key={day}
                className="py-1 text-center text-xs font-medium text-gray-400"
              >
                {day}
              </span>
            ))}
          </div>

          {/* 날짜 그리드 */}
          <div className="grid grid-cols-7 gap-1">
            {/* 이전 달 날짜 (회색) */}
            {prevDays.map((d) => (
              <span
                key={`prev-${d}`}
                className="cursor-default py-2 text-center text-sm text-gray-600"
              >
                {d}
              </span>
            ))}
            {/* 이번 달 날짜 */}
            {days.map((d) => {
              const isToday =
                new Date().toDateString() ===
                new Date(year, month, d).toDateString();
              const isSelected =
                value ===
                new Date(year, month, d, 12).toISOString().split("T")[0];

              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => handleDateSelect(d)}
                  className={`rounded-lg py-2 text-center text-sm transition-colors ${isSelected ? "bg-violet-600 font-bold text-white" : "text-white hover:bg-gray-700"} ${isToday && !isSelected ? "border border-violet-400 font-bold text-violet-400" : ""} `}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
