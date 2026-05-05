import { putInvitationAnswer } from "@/api/data";

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
  const answerMutation = useAcceptInvitationMutation();

  const onClickDismiss = async (id: number) => {
    answerMutation.mutate({
      data: { inviteAccepted: true },
      invitationId: id,
    });
  };
  const onClickAccept = async (id: number) => {
    await putInvitationAnswer(id, { inviteAccepted: true });
    window.location.reload();
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
