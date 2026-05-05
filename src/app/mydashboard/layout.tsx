import { MyDashboardHeader } from "@/components/layout/MyDashboardHeader";
import { SideMenu } from "@/components/SideMenu";
import { SideMenuProvider } from "@/contexts/SideMenuContext";

interface MyDashboardLayoutProps {
  children: React.ReactNode;
}

export default function MyDashboardLayout({
  children,
}: MyDashboardLayoutProps) {
  return (
    <SideMenuProvider>
      <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
        {/* 1. 사이드 메뉴 영역 */}
        <aside className="bg-black-900 h-screen text-white select-none">
          <SideMenu />
        </aside>

        <div className="flex h-screen min-w-0 flex-col overflow-hidden bg-[#1B1A1F]">
          <header className="flex h-12.5 items-center border-b border-gray-800 bg-[#1B1A1F] text-white md:h-15">
            <MyDashboardHeader />
          </header>

          <main className="w-full flex-1 overflow-x-auto text-white [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neutral-600 [&::-webkit-scrollbar-track]:bg-transparent">
            {children}
          </main>
        </div>
      </div>
    </SideMenuProvider>
  );
}
