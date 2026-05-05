// DashboardColorChoiceList.tsx

"use client";
import { VariantProps, cva } from "class-variance-authority";

import { DashboardColorItem } from "./DashboardColorItem";

const typeVariants = cva("flex gap-2", {
  variants: {
    type: {
      default: "h-10 w-73.75 md:h-15 md:w-135",
      edit: "h-22.5 w-full gap-4 max-lg:h-15 max-md:h-14 max-md:gap-3",
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export type ColorName = "red" | "orange" | "yellow" | "green" | "blue";

interface Props extends VariantProps<typeof typeVariants> {
  selectedColorName?: ColorName;
  onColorChange: (colorName: ColorName) => void;
  hasSelection?: boolean;
}

export function DashboardColorChoiceList({
  type,
  selectedColorName,
  onColorChange,
  hasSelection = true,
}: Props) {
  const colorList: ColorName[] = ["red", "orange", "yellow", "green", "blue"];

  return (
    <div className="flex flex-col gap-3">
      <div className="text-gray-300">색상</div>
      <div className={typeVariants({ type: type })}>
        {colorList.map((name) => (
          <DashboardColorItem
            key={name}
            color={name}
            isSelected={selectedColorName === name}
            handleClick={() => onColorChange(name)}
            hasSelection={hasSelection}
          />
        ))}
      </div>
    </div>
  );
}
