import { HashtagIcon } from "@/assets/dashboard/ic-colorchips";

import { DashboardList } from "../page";

import { MyDashboardItemContainer } from "./MyDashBoardItemContainer";
import { MyDashboardItemContainerAdd } from "./MyDashboardItemContainerAdd";

interface DashboardCard {
  id: number;
  title: string;
  color: string;
}

interface MydashboardListProp {
  data: DashboardList[];
  currentPage: number;
}

export function MydashboardList({ data, currentPage }: MydashboardListProp) {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      {currentPage === 1 && <MyDashboardItemContainerAdd />}
      {data.map((item: DashboardCard) => (
        <MyDashboardItemContainer key={item.id} dashid={item.id}>
          {/* @TODO Hash 컴포넌트로 교체 */}
          <div className="flex items-center gap-1">
            <HashtagIcon size={20} color={item.color} />
            {item.title}
          </div>
        </MyDashboardItemContainer>
      ))}
    </div>
  );
}
