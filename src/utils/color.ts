import { COLOR_KEYS, TAG_COLORS } from "@/constants/colors";

/**
 * 이름에 따른 고유한 색상 tailwind class string을 반환
 * @param name 이름
 * @returns 색상
 */
export function getRandomColor(name: string): string {
  if (!name) return TAG_COLORS["violet"];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  const index = Math.abs(hash) % COLOR_KEYS.length;
  const selectedKey = COLOR_KEYS[index];

  return TAG_COLORS[selectedKey];
}
