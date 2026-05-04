/**
 * ISO 날짜 문자열을 한국식 날짜로 변환
 * @param dateString ISO Date String (예: 2026-04-30T20:43:01.640Z)
 * @returns yyyy년 m월 d일 형식의 문자열 (예: 2026년 4월 30일)
 */
export function getFormatDate(dateString: string) {
  const date = new Date(dateString);

  const dateStr = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return dateStr;
}

/**
 * ISO 날짜 문자열을 한국식 시간으로 변환
 * @param dateString ISO Date String (예: 2026-04-30T20:43:01.640Z)
 * @returns 오전/오후 HH:MM 형식의 문자열 (예: 오후 8:43)
 */
export function getFormatTime(dateString: string) {
  const date = new Date(dateString);

  const timeStr = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return timeStr;
}
