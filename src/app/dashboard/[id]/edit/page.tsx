"use client";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  getInvitationListAction,
  getMemberListAction,
} from "@/actions/dashboard-edit";
import { getDashboardDetail } from "@/api/data";
import icSideMenu from "@/assets/ic-sidemenu.svg";
import icTrash from "@/assets/ic-trash.svg";
import { Invitation, Member } from "@/types/api";

import { DashboardEdit } from "../_components/DashboardEdit";
import { DashboardEditHeader } from "../_components/DashboardEditHeader";
import { EditSideButton } from "../_components/EditSideButton";
import { MemberManagement } from "../_components/MemberManagement";

type Section = "edit" | "members" | "dashboardDelete";

export default function Edit() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("edit");

  const [memberPage, setMemberPage] = useState(1);
  const [invitePage, setInvitePage] = useState(1);
  const [totalMemberCount, setTotalMemberCount] = useState(0);
  const [totalInviteCount, setTotalInviteCount] = useState(0);

  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [dashboardData, setDashboardData] = useState({ title: "", color: "" });
  const params = useParams();
  const dashboardId = Number(params.id);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDelete = () => {
    router.push(`/dashboard/${dashboardId}/edit/dashboard-delete`);
  };

  const handleFetchAllData = useCallback(async () => {
    if (!dashboardId) return;

    try {
      const [detailRes, memberRes, inviteRes] = await Promise.all([
        getDashboardDetail(dashboardId),
        getMemberListAction({ dashboardId, page: memberPage, size: 6 }),
        getInvitationListAction({ dashboardId, page: invitePage, size: 6 }),
      ]);

      setDashboardData({ title: detailRes.title, color: detailRes.color });
      if (memberRes.success) {
        setMembers(memberRes.data.members);
        setTotalMemberCount(memberRes.data.totalCount);
      }
      if (inviteRes.success) {
        setInvitations(inviteRes.data.invitations);
        setTotalInviteCount(inviteRes.data.totalCount);
      }
    } catch (error) {
      console.error("데이터 로딩 오류:", error);
      router.push("/mydashboard");
    }
  }, [dashboardId, router, memberPage, invitePage]);

  useEffect(() => {
    const loadData = async () => {
      await handleFetchAllData();
    };
    loadData();
  }, [handleFetchAllData, searchParams]);

  const handleSectionClick = (section: Section) => {
    if (section === "dashboardDelete") {
      return handleDelete();
    }
    setActiveSection(section);
    setIsSidebarOpen(false);
  };

  return (
    <div className="grid h-screen md:grid-cols-[minmax(250px,540px)_1fr]">
      <aside
        className={`bg-black-900 flex px-6 pt-22.5 max-md:fixed max-md:top-0 max-md:left-0 max-md:z-50 max-md:h-full max-md:w-62.5 max-md:justify-start ${isSidebarOpen ? "max-md:block" : "max-md:hidden"} md:relative md:flex md:justify-end`}
      >
        <div className="flex w-full max-w-69 min-w-37.75 flex-col gap-2 text-lg text-white">
          <EditSideButton
            isActive={activeSection === "edit"}
            handleClick={() => handleSectionClick("edit")}
          >
            대시보드 편집
          </EditSideButton>

          <EditSideButton
            isActive={activeSection === "members"}
            handleClick={() => handleSectionClick("members")}
          >
            멤버 관리
          </EditSideButton>

          <div className="bg-modal-background mx-4 my-1 h-px" />

          <EditSideButton
            isDelete
            icon={icTrash}
            handleClick={() => handleSectionClick("dashboardDelete")}
          >
            대시보드 삭제하기
          </EditSideButton>
        </div>
      </aside>

      <div className="flex flex-col">
        <header className="border-black-700 flex h-18 items-center border-b-2 pl-5">
          <button onClick={() => setIsSidebarOpen(true)} className="md:hidden">
            <Image src={icSideMenu} alt="사이드 메뉴" height={20} width={20} />
          </button>
        </header>

        {/* 구역 3: 메인 콘텐츠 */}
        <main className="flex-1 overflow-y-auto">
          <div className="flex max-w-185 flex-col gap-7.5 px-12.5 text-zinc-400 max-md:px-5">
            <DashboardEditHeader
              title={activeSection === "edit" ? "대시보드 편집" : "멤버 관리"}
            />
            {activeSection === "edit" ? (
              <DashboardEdit
                initialData={dashboardData}
                onUpdate={handleFetchAllData}
              />
            ) : (
              <MemberManagement
                members={members}
                invitations={invitations}
                memberPagination={{
                  current: memberPage,
                  total: Math.ceil(totalMemberCount / 6),
                  setPage: setMemberPage,
                }}
                invitePagination={{
                  current: invitePage,
                  total: Math.ceil(totalInviteCount / 6),
                  setPage: setInvitePage,
                }}
              />
            )}
          </div>
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
