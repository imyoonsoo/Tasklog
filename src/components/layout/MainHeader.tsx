"use client";

import Image from "next/image";
import Link from "next/link";

import logoImg from "@/assets/common/logo.svg";

interface MainHeaderProps {
  isLoggedIn?: boolean;
}

export function MainHeader({ isLoggedIn = false }: MainHeaderProps) {
  if (isLoggedIn) return null;
  return (
    <header className="border-black-700 bg-background font-pretendard fixed top-0 right-0 left-0 z-50 flex h-16.75 w-full items-center justify-between border-b-2 px-3.5 py-5 opacity-100 md:h-24 md:px-7.5 md:py-6 lg:px-30">
      <Link href="/" className="flex items-center transition hover:opacity-80">
        <div className="relative h-[36.25px] w-35 md:h-12 md:w-46.5">
          <Image
            src={logoImg}
            alt="Taskify로고"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>

      <nav className="flex h-9.75 items-center">
        <div className="flex gap-3 md:gap-3.5">
          <Link
            href="/login"
            className="px-2.25 py-2.25 text-base text-gray-300 transition hover:text-white"
          >
            로그인
          </Link>
          <Link
            href="/signup"
            className="px-2.25 py-2.25 text-base text-gray-300 transition hover:text-white"
          >
            회원가입
          </Link>
        </div>
      </nav>
    </header>
  );
}
