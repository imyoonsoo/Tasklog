"use client";

import { useAcceptInvitationMutation } from "../hooks/useInvitations";

import { InvitionHeader } from "./InvitionHeader";
import { InvitionRow } from "./InvitionRow";

export interface UserInfo {
  id: number;
  nickname: string;
  email: string;
}

export interface DashboardInfo {
  id: number;
  title: string;
}

export interface InvitedData {
  id: number;
  inviter: UserInfo;
  teamId: string;
  dashboard: DashboardInfo;
  invitee: UserInfo;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}
interface InvitionContainerProps {
  invitedData: InvitedData[];
}
export function InvitionContainer({ invitedData }: InvitionContainerProps) {
  // const { data: InvitedData = [] } = useGetInvitations("");
  const answerMutation = useAcceptInvitationMutation();

  const onClickDismiss = (id: number) => {
    answerMutation.mutate({
      data: { inviteAccepted: false }, // 거절 처리라면 false
      invitationId: id,
    });
    console.log("ttjdrhd");
  };

  const onClickAccept = (id: number) => {
    answerMutation.mutate({
      data: { inviteAccepted: true },
      invitationId: id,
    });
  };
  return (
    <div>
      <div className="pd-3.5 hidden md:block">
        <InvitionHeader />
      </div>
      {invitedData.map((item) => (
        <InvitionRow
          key={item.id}
          title={item.dashboard.title}
          inviter={item.inviter}
          id={item.id}
          handleDismiss={onClickDismiss}
          handleAccept={onClickAccept}
        />
      ))}
    </div>
  );
}
