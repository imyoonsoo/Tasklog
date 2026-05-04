"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";

interface ModalProps {
  children: React.ReactNode;
}

export function PageModal({ children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useClickOutside(ref, () => {
    router.back();
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div
        className="bg-modal-background md:overflow-y-none flex h-full w-full flex-col md:mx-12.5 md:h-[90vh] md:rounded-[20px] lg:w-220"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
