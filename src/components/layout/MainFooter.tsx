import Image from "next/image";
import Link from "next/link";

import logoImg from "@/assets/common/logo.svg";
import iconEmail from "@/assets/landing/ic-email.svg";
import iconFacebook from "@/assets/landing/ic-facebook.svg";
import iconInstagram from "@/assets/landing/ic-instagram.svg";

export function MainFooter() {
  return (
    <footer className="bg-black-900 border-black-800 w-full border-t">
      <div className="flex h-37.75 flex-col gap-5 px-7.5 pt-3.5 pb-6 md:h-23 md:flex-row md:items-center md:justify-between md:gap-0 md:px-10 md:py-6 lg:h-24 lg:px-30">
        <div className="relative h-8.5 w-32.5 md:h-11 md:w-42.5 lg:h-12 lg:w-46.5">
          <Image
            src={logoImg}
            alt="Taskify 로고"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex gap-5 md:gap-6 lg:gap-8">
          <span className="text-sm text-gray-400 md:text-[15px] lg:text-base">
            Privacy Policy
          </span>
          <span className="text-sm text-gray-400 md:text-[15px] lg:text-base">
            FAQ
          </span>
        </div>

        <div className="flex h-5.5 w-23 items-center gap-3.5">
          <Link href="mailto:contact@taskify.com">
            <Image src={iconEmail} alt="email" width={22} height={22} />
          </Link>
          <Link href="https://facebook.com" target="_blank">
            <Image src={iconFacebook} alt="facebook" width={22} height={22} />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <Image src={iconInstagram} alt="instagram" width={22} height={22} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
