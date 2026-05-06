import React, { useState, useRef, useEffect } from "react";

export function FlowbiteDatePicker({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const dateStr = value ? value.replace("T", " ").split(" ")[0] : "";
  const timeStr = value
    ? value.replace("T", " ").split(" ")[1] || "00:00"
    : "00:00";

  const [viewDate, setViewDate] = useState(
    dateStr ? new Date(dateStr) : new Date()
  );
  const [hour, setHour] = useState(timeStr.split(":")[0] || "00");
  const [minute, setMinute] = useState(timeStr.split(":")[1] || "00");

  const containerRef = useRef<HTMLDivElement>(null);

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
    const selected = new Date(year, month, day, 12);
    const newDatePart = selected.toISOString().split("T")[0];
    setViewDate(selected);
    emitChange(newDatePart, hour, minute);
  };

  const emitChange = (d: string, h: string, m: string) => {
    if (!d) return;
    const pureDate = d.includes("T") ? d.split("T")[0] : d;
    onChange(`${pureDate} ${h.padStart(2, "0")}:${m.padStart(2, "0")}`);
  };

  const handleHourChange = (val: string) => {
    const clamped = Math.min(23, Math.max(0, Number(val) || 0))
      .toString()
      .padStart(2, "0");
    setHour(clamped);
    if (dateStr) emitChange(dateStr, clamped, minute);
  };

  const handleMinuteChange = (val: string) => {
    const clamped = Math.min(59, Math.max(0, Number(val) || 0))
      .toString()
      .padStart(2, "0");
    setMinute(clamped);
    if (dateStr) emitChange(dateStr, hour, clamped);
  };

  const stepHour = (delta: number) => {
    const next = ((Number(hour) + delta + 24) % 24).toString().padStart(2, "0");
    setHour(next);
    if (dateStr) emitChange(dateStr, next, minute);
  };

  const stepMinute = (delta: number) => {
    const next = ((Number(minute) + delta + 60) % 60)
      .toString()
      .padStart(2, "0");
    setMinute(next);
    if (dateStr) emitChange(dateStr, hour, next);
  };

  const displayValue = value ? value.replace("T", " ").slice(0, 16) : "";

  return (
    <div className={`relative ${className}`} ref={containerRef}>
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
          value={displayValue}
          placeholder="날짜와 시간을 선택하세요"
          className="block w-full cursor-pointer rounded-lg border border-gray-700 bg-[#201F23] p-3 ps-10 text-sm text-white transition-all outline-none focus:border-[#00BFFF] focus:ring-[#524F5B]"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-[320px] rounded-lg border border-gray-700 bg-[#1F2937] shadow-xl">
          <div className="p-4">
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

            <div className="grid grid-cols-7 gap-1">
              {prevDays.map((d) => (
                <span
                  key={`prev-${d}`}
                  className="cursor-default py-2 text-center text-sm text-gray-600"
                >
                  {d}
                </span>
              ))}
              {days.map((d) => {
                const isToday =
                  new Date().toDateString() ===
                  new Date(year, month, d).toDateString();
                const isSelected =
                  dateStr ===
                  new Date(year, month, d, 12).toISOString().split("T")[0];

                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handleDateSelect(d)}
                    className={`rounded-lg py-2 text-center text-sm transition-colors ${isSelected ? "bg-[#00A200] font-bold text-white" : "text-white hover:bg-gray-700"} ${isToday && !isSelected ? "border border-[#00A200] font-bold text-white" : ""} `}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mx-4 border-t border-gray-600" />

          <div className="p-4">
            <div className="mb-2 flex items-center gap-2">
              <svg
                className="h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-medium text-gray-400">
                시간 선택
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => stepHour(1)}
                  className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2.5" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <input
                  type="number"
                  value={hour}
                  onChange={(e) => setHour(e.target.value)}
                  onBlur={(e) => handleHourChange(e.target.value)}
                  className="w-12 rounded-lg border border-gray-600 bg-[#111827] py-2 text-center text-lg font-bold text-white outline-none focus:border-[#00BFFF]"
                />
                <button
                  type="button"
                  onClick={() => stepHour(-1)}
                  className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <span className="mb-4 text-2xl font-bold text-gray-400">:</span>

              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => stepMinute(1)}
                  className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2.5" d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <input
                  type="number"
                  value={minute}
                  onChange={(e) => setMinute(e.target.value)}
                  onBlur={(e) => handleMinuteChange(e.target.value)}
                  className="w-12 rounded-lg border border-gray-600 bg-[#111827] py-2 text-center text-lg font-bold text-white outline-none focus:border-[#00BFFF]"
                />
                <button
                  type="button"
                  onClick={() => stepMinute(-1)}
                  className="rounded p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 px-4 py-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-lg bg-[#00A200] py-2 text-sm font-semibold text-white transition-colors hover:bg-[#10671F]"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
