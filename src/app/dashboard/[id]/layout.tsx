import { getMemberList } from "@/api/data";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { SideMenu } from "@/components/SideMenu";

interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ id: number }>;
}

export default async function DashboardLayout({
  children,
  modal,
  params,
}: DashboardLayoutProps) {
  const { id } = await params;
  const memberData = await getMemberList({ dashboardId: id, size: 20 });

  return (
    <div className="grid min-h-screen w-full grid-cols-[auto_1fr]">
      {/* 1. 사이드 메뉴 영역 */}
      <aside className="h-screen border-r border-gray-800 bg-[#1B1A1F] text-white select-none">
        <SideMenu />
      </aside>

      <div className="flex h-screen min-w-0 flex-col overflow-hidden bg-[#131214]">
        <header className="flex h-12.5 items-center border-b border-gray-800 bg-[#1B1A1F] text-white md:h-15">
          <DashboardHeader
            members={memberData.members}
            totalCount={memberData.totalCount}
          />
        </header>

        <main className="w-full flex-1 overflow-x-auto overflow-y-auto text-white">
          {children}
        </main>
      </div>
      {modal}
    </div>
  );
}
