interface DashboardLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

// TODO: 레이아웃에서 dashboard 관련 정보들을 한번에 불러오고 context 관리
export default async function DashboardLayout({
  children,
  modal,
}: DashboardLayoutProps) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}
