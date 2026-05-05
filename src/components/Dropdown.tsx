"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import iconChevronDown from "@/assets/common/ic-chevron-down.svg";

export interface DropdownOption {
  label: string;
  value: string;
  image?: string;
}

interface DropdownProps {
  options: DropdownOption[];
  label: string;
  onSelect?: (value: string) => void;
  defaultValue?: string;
  showAvatar?: boolean;
}

export function Dropdown({
  options,
  label,
  onSelect,
  defaultValue,
  showAvatar = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<DropdownOption | null>(
    options.find((opt) => opt.value === defaultValue) || null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* 라벨 */}
      <label className="mb-2 block text-[16px] font-semibold text-gray-100">
        {label}
      </label>

      {/* 선택 영역 */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black-800 flex h-13.5 w-full cursor-pointer items-center justify-between rounded-[14px] border border-gray-700 px-5 py-1.5"
      >
        <div className="flex items-center gap-2 truncate">
          {showAvatar &&
            selected &&
            (selected.image ? (
              <Image
                src={selected.image}
                alt={selected.label}
                width={20}
                height={20}
                className="h-5 w-5 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-[10px] text-white">
                {selected.label.slice(0, 2)}
              </div>
            ))}

          <span
            className={`text-[16px] ${
              selected ? "text-gray-100" : "text-gray-400"
            }`}
          >
            {selected ? selected.label : "선택"}
          </span>
        </div>

        <button
          type="button"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <Image src={iconChevronDown} alt="열기" width={24} height={24} />
        </button>
      </div>

      {/* 옵션 리스트 */}
      {isOpen && (
        <ul className="bg-black-800 absolute z-10 mt-2 max-h-50 w-full overflow-y-auto rounded-lg border border-gray-700 shadow-lg">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                onSelect?.(option.value);
              }}
              className="flex cursor-pointer items-center gap-2 px-4 py-3 text-[16px] text-gray-100 transition-colors hover:bg-gray-700"
            >
              {showAvatar &&
                (option.image ? (
                  <Image
                    src={option.image}
                    alt={option.label}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-600 text-[10px] text-white">
                    {option.label.slice(0, 2)}
                  </div>
                ))}

              <span>{option.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
