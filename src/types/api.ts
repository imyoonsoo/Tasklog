// ==========================================================
// [ Auth ] - 로그인 및 비밀번호 변경
// ==========================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: number;
    email: string;
    nickname: string;
    profileImageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
  accessToken: string;
}

export interface PasswordUpdateRequest {
  password: string;
  newPassword: string;
}

// ==========================================================
// [ Users ] - 회원가입, 내 정보 조회, 수정, 프로필 이미지 업로드
// ==========================================================

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface UpdateUserRequest {
  nickname: string;
  profileImageUrl: string | null;
}

export interface UploadProfileImageResponse {
  profileImageUrl: string;
}

// ==========================================================
// [ Card ] - 카드 생성, 목록 조회, 수정, 상세 조회, 삭제
// ==========================================================

export interface CreateCardRequest {
  assigneeUserId?: number;
  dashboardId: number;
  columnId: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}

export interface Assignee {
  id: number;
  nickname: string;
  profileImageUrl: string | null;
}

export interface CreateCardResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetCardListRequest {
  columnId: number;
  size?: number;
  cursorId?: number;
}

export interface GetCardListResponse {
  cards: Card[];
  totalCount: number;
  cursorId: number | null;
}

// 카드 수정
export interface UpdateCardRequest {
  columnId: number;
  assigneeUserId: number;
  title: string;
  description: string;
  dueDate: string;
  tags: string[];
  imageUrl: string;
}

export interface UpdateCardResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}

export interface CardResponse {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
  teamId: string;
  columnId: number;
  dashboardId: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================================
// [ Columns ] - 칼럼 생성, 목록 조회, 수정, 삭제, 카드 이미지 업로드
// ==========================================================

export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

export interface ColumnResponse {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetColumnListResponse {
  result: "SUCCESS" | "FAIL"; // 응답 결과 상태
  data: ColumnResponse[]; // 앞서 만든 ColumnResponse 구조의 배열
}

export interface UpdateColumnRequest {
  title: string;
}

export interface UploadCardImageResponse {
  imageUrl: string;
}

// ==========================================================
// [ Comment ] - 코맨트 생성, 목록 조회, 수정, 삭제
// ==========================================================

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
}

export interface CreateCommentRequest {
  content: string;
  cardId: number;
  columnId: number;
  dashboardId: number;
}

export interface GetCommentListRequest {
  cardId: number;
  cursorId?: number;
  size?: number;
}

export interface GetCommentListResponse {
  cursorId: number | null;
  comments: Comment[];
}

export interface UpdateCommentRequest {
  content: string;
}

// ==========================================================
// [ Dashboards ] - 대시보드 생성, 목록 조회, 상세 조회, 수정, 삭제, 초대하기, 초대 불러오기, 초대 취소
// ==========================================================

export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface CreateDashboardRequest {
  title: string;
  color: string;
}
export interface GetDashboardListRequest {
  navigationMethod: "infiniteScroll" | "pagination";
  cursorId?: number;
  page?: number;
  size?: number;
}

export interface GetDashboardListResponse {
  cursorId: number | null;
  totalCount: number;
  dashboards: Dashboard[];
}

export interface UpdateDashboardRequest {
  title: string;
  color: string;
}

export interface Invitation {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvitationRequest {
  email: string;
}

export interface GetInvitationListRequest {
  page?: number;
  size?: number;
}

export interface GetInvitationListResponse {
  totalCount: number;
  invitations: Invitation[];
}

// ==========================================================
// [ Invitations ] - 내가 받은 초대 목록 조회, 응답
// ==========================================================

export interface GetMyInvitationListRequest {
  size?: number;
  cursorId?: number;
  title?: string;
}

export interface GetMyInvitationListResponse {
  cursorId: number | null;
  invitations: Invitation[];
}

export interface AnswerInvitationRequest {
  inviteAccepted: boolean;
}

// ==========================================================
// [ Members ] - 대시보드 맴버 목록 조회, 맴버 삭제
// ==========================================================

export interface Member {
  id: number;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface GetMemberListRequest {
  dashboardId: number;
  page?: number;
  size?: number;
}

export interface GetMemberListResponse {
  members: Member[];
  totalCount: number;
}

// ==========================================================
// [ APIResponse ] - API 응답 구조
// ==========================================================

export interface APISuccessResponse {
  success: true;
  data?: unknown;
}
export interface APIErrorResponse {
  success: false;
  message: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export type APIResponse = APISuccessResponse | APIErrorResponse;
