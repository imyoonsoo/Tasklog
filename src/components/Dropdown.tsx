"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

import iconChevronDown from "@/assets/common/ic-chevron-down.svg";

interface DropdownProps {
  options: string[];
  label: string;
  onSelect?: (value: string) => void;
  defaultValue?: string;
}

export function Dropdown({
  options,
  label,
  onSelect,
  defaultValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || "");

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
      <label className="font-pretendard mb-2 block text-[16px] font-semibold text-gray-100">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black-800 flex h-13.5 w-full cursor-pointer items-center justify-between rounded-[14px] border border-solid border-gray-700 px-5 py-1.5 transition-all"
      >
        <span
          className={`truncate text-[16px] ${selected ? "text-gray-100" : "text-gray-400"}`}
        >
          {selected || `선택`}
        </span>

        <button
          type="button"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <Image src={iconChevronDown} alt="열기" width={24} height={24} />
        </button>
      </div>

      {isOpen && (
        <ul className="bg-black-800 absolute z-10 mt-2 max-h-50 w-full overflow-y-auto rounded-lg border border-gray-700 shadow-lg">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
                if (onSelect) onSelect(option);
              }}
              className="cursor-pointer px-4 py-3 text-[16px] text-gray-100 transition-colors hover:bg-gray-700"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
