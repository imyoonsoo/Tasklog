"use client";

import {
  useAcceptInvitationMutation,
  useGetInvitations,
} from "../hooks/useInvitations";

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

export function InvitionContainer({ searchWord = "" }: { searchWord: string }) {
  const { data } = useGetInvitations(searchWord);
  const { mutate: acceptInvitation } = useAcceptInvitationMutation();
  const invitations = data?.pages.flatMap((page) => page.invitations) ?? [];

  const onClickDismiss = (id: number) => {
    acceptInvitation({
      invitationId: id,
      data: { inviteAccepted: false },
    });
  };

  const onClickAccept = (id: number) => {
    acceptInvitation({
      invitationId: id,
      data: { inviteAccepted: true },
    });
  };

  return (
    <div>
      <div className="pd-3.5 hidden md:block">
        <InvitionHeader />
      </div>
      {invitations.map((item) => (
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
