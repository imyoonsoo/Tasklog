"use client";

import Image from "next/image";
import Link from "next/link";

import imgSection1 from "@/assets/landing/img-section1.svg";
import imgSection2 from "@/assets/landing/img-section2.svg";
import imgSection3_mobile from "@/assets/landing/img-section3-mobile.svg";
import imgSection3_tablet from "@/assets/landing/img-section3-tablet.svg";
import imgSection3 from "@/assets/landing/img-section3.svg";
import imgSection4_mobile_1 from "@/assets/landing/img-section4-dashboard-mobie.svg";
import imgSection4_tablet_1 from "@/assets/landing/img-section4-dashboard-tablet.svg";
import imgSection4_1 from "@/assets/landing/img-section4-dashboard.svg";
import imgSection4_mobile_2 from "@/assets/landing/img-section4-invite-mobile.svg";
import imgSection4_tablet_2 from "@/assets/landing/img-section4-invite-tablet.svg";
import imgSection4_2 from "@/assets/landing/img-section4-invite.svg";
import imgSection4_mobile_3 from "@/assets/landing/img-section4-member-mobile.svg";
import imgSection4_tablet_3 from "@/assets/landing/img-section4-member-tablet.svg";
import imgSection4_3 from "@/assets/landing/img-section4-member.svg";

export function LandingContent() {
  const section3Cards = [
    {
      pc: imgSection4_1,
      tablet: imgSection4_tablet_1,
      mobile: imgSection4_mobile_1,
      title: "대시보드 설정",
      desc: "대시보드 사진과 이름을 변경할 수 있습니다.",
    },
    {
      pc: imgSection4_2,
      tablet: imgSection4_tablet_2,
      mobile: imgSection4_mobile_2,
      title: "초대",
      desc: "새로운 팀원을 초대할 수 있습니다.",
    },
    {
      pc: imgSection4_3,
      tablet: imgSection4_tablet_3,
      mobile: imgSection4_mobile_3,
      title: "구성원",
      desc: "구성원을 초대하고 내보낼 수 있습니다.",
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#161519] font-[family-name:var(--font-pretendard)] text-white">
      <section className="relative mx-auto flex w-full max-w-[1920px] flex-col items-center overflow-hidden md:flex-row md:items-center lg:h-[940px] lg:gap-[100px]">
        <div className="z-10 flex w-full flex-col justify-center px-6 py-10 md:mt-[51px] md:w-auto md:px-12 md:py-0 lg:mt-0 lg:h-full lg:pl-[clamp(40px,12vw,240px)]">
          <div className="text-center md:text-left">
            <div className="space-y-2 md:space-y-4">
              <p className="text-[24px] leading-tight font-bold md:text-5xl lg:text-[60px] lg:whitespace-nowrap">
                더 새로워진 일정 관리
              </p>
              <h1 className="text-brand-500 text-[30px] font-extrabold tracking-tight md:text-6xl lg:text-[90px]">
                TASKIFY
              </h1>
            </div>

            <div className="mt-10 grid w-full grid-cols-2 gap-3 md:flex md:flex-col md:items-start md:gap-4 lg:mt-[50px] lg:flex-row lg:gap-5">
              {/* 2. 회원가입 버튼 수정 */}
              <Link href="/signup" className="w-full md:w-auto">
                <button className="h-[50px] w-full cursor-pointer rounded-full bg-zinc-700 text-sm font-semibold transition-colors hover:bg-zinc-600 md:h-[60px] md:w-[293px] md:text-base lg:w-[200px]">
                  회원가입하기
                </button>
              </Link>

              {/* 3. 로그인 버튼 수정 */}
              <Link href="/login" className="w-full md:w-auto">
                <button className="bg-brand-500 hover:bg-brand-400 h-[50px] w-full cursor-pointer rounded-full text-sm font-semibold text-white transition-colors md:h-[60px] md:w-[293px] md:text-base lg:w-[200px]">
                  로그인하기
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden w-full justify-end md:mt-[51px] md:flex md:flex-1 lg:mt-0">
          <div
            className="relative h-[400px] w-full border border-zinc-800 bg-[#17171C] shadow-2xl md:h-[500px] lg:h-[682px] lg:w-[1212px]"
            style={{
              borderTopLeftRadius: "30px",
              borderBottomLeftRadius: "30px",
            }}
          >
            <Image
              src={imgSection1}
              alt="Taskify 메인 대시보드"
              fill
              priority
              className="object-cover object-left-top"
            />
          </div>
        </div>
      </section>

      {/* Point 1 */}
      <section className="mx-auto flex max-w-[1212px] flex-col items-start gap-10 px-6 py-12 md:px-0 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="relative h-[250px] w-full overflow-hidden md:h-[450px] lg:h-[682px] lg:w-[650px]">
          <Image
            src={imgSection2}
            alt="할 일 리스트"
            fill
            className="object-contain p-6 md:p-10 lg:p-12"
          />
        </div>

        <div className="mx-auto w-[315px] space-y-4 text-left md:mx-0 md:w-full md:max-w-[535px] md:pl-24 lg:mx-0 lg:w-full lg:max-w-[520px] lg:pl-0">
          <p className="text-brand-500 text-sm font-bold md:text-lg">Point 1</p>
          <h2 className="text-[24px] leading-tight font-bold md:text-[32px] lg:text-[50px]">
            내가 등록한 사진으로
            <br className="lg:hidden" /> 더 기억에 남는 할 일 리스트
          </h2>
          <p className="text-sm text-zinc-400 md:text-lg">
            카드 내 추가한 이미지를 상단 썸네일로 노출하여
            <br className="lg:hidden" />
            작업에 대한 내용을 더 직관적으로 떠올릴 수 있어요
          </p>
        </div>
      </section>

      {/* Point 2 Section */}
      <section className="mx-auto flex w-full max-w-[1920px] flex-col items-start overflow-hidden lg:flex-row lg:items-center lg:py-24">
        <div className="z-10 order-2 mx-auto flex w-[315px] flex-col justify-center py-12 text-left md:mx-0 md:w-full md:max-w-[530px] md:py-16 md:pl-24 lg:order-1 lg:mx-0 lg:max-w-[700px] lg:py-0 lg:pl-[clamp(40px,12vw,240px)]">
          <p className="text-brand-500 text-sm font-bold md:text-lg">Point 2</p>
          <h2 className="mt-4 text-[24px] leading-tight font-bold md:text-[32px] lg:text-[45px]">
            자세한 정보는 명확하게,
            <br />팀 논의는 빠르게 확인하세요
          </h2>
          <p className="mt-4 text-sm text-zinc-400 md:text-lg">
            작업에 필요한 세부 내용을 손쉽게 정리하고,
            <br />
            댓글을 통해 팀원들과 빠르게 소통해보세요
          </p>
        </div>

        <div className="relative order-1 flex w-full justify-center px-6 pt-10 md:pt-16 lg:order-2 lg:ml-[150px] lg:flex-1 lg:justify-start lg:px-0 lg:pt-0 lg:pr-[100px]">
          <div className="relative aspect-[315/640] w-full max-w-[315px] overflow-hidden md:aspect-[709/714] md:max-w-[709px]">
            <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-[#161519] to-transparent lg:hidden" />
            <Image
              src={imgSection3_mobile}
              alt="상세 정보"
              fill
              className="object-cover object-center md:hidden"
            />
            <Image
              src={imgSection3_tablet}
              alt="상세 정보"
              fill
              className="hidden object-contain object-center md:block lg:hidden"
            />
            <Image
              src={imgSection3}
              alt="상세 정보"
              fill
              className="hidden object-contain object-left-top lg:block"
            />
          </div>
        </div>
      </section>

      {/* Point 3 */}
      <section className="relative w-full py-12 md:py-24">
        <div className="mx-auto w-full max-w-[1920px] lg:pr-[240px] lg:pl-[clamp(40px,12vw,240px)]">
          <div className="mx-auto w-[320px] text-left md:mx-0 md:w-full md:max-w-[502px] md:pl-24 lg:mx-0 lg:max-w-[700px] lg:py-6 lg:pl-0">
            <p className="text-brand-500 mb-2 text-base font-bold lg:text-lg">
              Point 3
            </p>
            <h2 className="text-[24px] leading-tight font-bold md:text-[32px] lg:text-[50px]">
              나에게 맞게, 더 효율적으로
              <br />
              생산성을 높이는 다양한 설정
            </h2>
            <p className="mt-4 text-base text-zinc-400 lg:text-lg">
              작업 방식에 맞게 색상, 팀원, 구성원 등을
              <br className="md:hidden" /> 쉽게 관리할 수 있어요.
              <br />
              환경을 조율하면 일은 더 가볍고 빠르게 흘러갑니다.
            </p>
          </div>

          <div className="mt-8 flex w-full flex-col gap-0 px-6 md:mt-10 md:gap-[30px] md:px-24 lg:mt-0 lg:flex-row lg:gap-[30px] lg:px-0">
            {section3Cards.map((item, idx) => {
              const isLastItem = idx === section3Cards.length - 1;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-start lg:max-w-[462px] lg:flex-1"
                >
                  <div
                    className={`relative mx-auto mt-[10px] w-full max-w-[315px] overflow-hidden md:mx-0 md:mt-0 md:aspect-[462/251] md:max-w-none lg:max-h-[251px] lg:max-w-[462px] ${
                      isLastItem ? "h-[144px] md:h-auto" : "aspect-[315/195]"
                    }`}
                  >
                    <Image
                      src={item.mobile}
                      alt={item.title}
                      fill
                      className="object-fill md:hidden"
                    />
                    <Image
                      src={item.tablet}
                      alt={item.title}
                      fill
                      className="hidden object-fill md:block lg:hidden"
                    />
                    <Image
                      src={item.pc}
                      alt={item.title}
                      fill
                      className="hidden object-fill lg:block"
                    />
                  </div>

                  <div className="mx-auto mt-[20px] flex w-full max-w-[315px] flex-col items-start gap-2 pb-[40px] md:mx-0 md:mt-[0px] md:max-w-none md:pb-0 lg:mx-0 lg:mt-[28px] lg:ml-[30px]">
                    <h3 className="text-left text-xl font-bold lg:text-[18px]">
                      {item.title}
                    </h3>
                    <p className="text-left text-sm text-zinc-400 lg:text-[16px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
