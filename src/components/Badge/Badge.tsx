import { getRandomColor } from "@/utils/color";

interface Prop {
  children?: string;
}

export function Badge({ children = "" }: Prop) {
  const colorClass = getRandomColor(children);

  return (
    <div
      className={`$inline-flex rounded-md px-1.5 py-1 text-sm ${colorClass}`}
    >
      {children}
    </div>
  );
}
