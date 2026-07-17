# 📊 Tasklog

> **Based on:** [Taskify](https://github.com/Useung0830/2-team-taskify)
>
> 팀 프로젝트 'Taskify' 종료 후 기술적 성장을 이어가기 위해 프로젝트를 포크했습니다.<br>
> 할 일 관리의 정체성은 유지하면서 고유한 명칭을 부여하고자 **'Tasklog'** 로 재배포했으며,<br>
> 현재 리팩토링, 성능 최적화, 기능 확장을 통해 지속적으로 개선 중입니다.

<br>

Tasklog는 대시보드 기반의 칸반 스타일 할 일 관리 서비스입니다.<br>
대시보드를 중심으로 업무를 관리하고 팀원과 협업할 수 있습니다.
<br><br>

## 📅 프로젝트 기간 & 배포링크
- **진행 기간**: 2026년 4월 20일 ~ 2026년 5월 7일
- **Vercel 배포**: [tasklog.vercel.app](https://tasklog-imyoonsoo.vercel.app/)

<br>

## 🔌 주요 기능

- **대시보드 관리** — 대시보드 생성, 수정, 삭제 및 관리
- **칸반보드** — 컬럼 및 카드 CRUD, 드래그 앤 드롭을 통한 상태별 업무 관리
- **댓글** — 업무 카드별 실시간 댓글 작성 및 피드백
- **팀원 초대 및 관리** — 이메일 기반 대시보드 초대, 멤버 권한 및 목록 관리
- **인증** — 로그인/회원가입, 계정 설정 및 비밀번호 변경
- **마이페이지** — 참여 중인 대시보드 관리 및 초대 수락/거절 목록 확인

<br>

## 🔧 기술 스택

| Category | Tech |
| :--- | :--- |
| **Framework** | Next.js (App Router) |
| **Library** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Server State** | TanStack Query |
| **HTTP Client** | Fetch |
| **Code Quality** | ESLint, Prettier, Husky (lint-staged) |
<br>

## ⚡ 코드 품질

Husky + lint-staged로 커밋 전 검사를 자동화했습니다. `git commit` 시 스테이징된 파일에 대해 다음이 자동 실행됩니다.

- `*.{ts,tsx,js,jsx}`: ESLint(`--fix`) → Prettier
- `*.{json,md}`: Prettier
<br><br>
## 🗂️ 프로젝트 구조

```
src/
├── actions/       # 서버 액션 (auth, comment, dashboard-edit, setting, revalidate)
├── api/           # API 클라이언트 및 데이터 페칭 (fetch, data)
├── app/           # App Router 페이지 및 레이아웃
│   ├── @modal/    # 병렬 라우트 모달 (account-setting, column-modify, new-dashboard)
│   ├── card/[cardId]/
│   ├── dashboard/[id]/
│   ├── login/
│   ├── mydashboard/
│   ├── mypage/
│   └── signup/
├── assets/        # 이미지 및 아이콘 (svg, png, 폰트)
├── components/    # 공통 UI 컴포넌트 (Button, Checkbox, Dropdown, SideMenu 등)
│   ├── AuthForm/, Badge/, dialog/, icons/, input/, label/
│   ├── layout/, modal/, profile/, style/, Textarea/
│   └── TaskDetail/Comment/
├── constants/     # 상수 (colors, Auth)
├── contexts/      # React Context (SideMenuContext)
├── feature/       # 도메인별 기능 단위 모듈 (dashboard, login, mydashboard, mypage, signup)
├── hooks/         # 공통 커스텀 훅 (useAuth, useCards, useClickOutside)
├── lib/           # 라이브러리 유틸 (cn 등)
├── providers/     # 전역 Provider (QueryProvider)
├── types/         # 타입 정의 (api, images, svgProps)
└── utils/         # 유틸 함수 (color, dashboard, date, validation)
```

<br>

## 📍 컨벤션

프로젝트 컨벤션은 [`conventions/`](conventions) 폴더의 문서를 참고하세요.

- [git 규칙](conventions/git%20규칙.md)
- [네이밍 규칙](conventions/네이밍%20규칙.md)
- [디렉터리 구조](conventions/디렉터리%20구조.md)
- [코드 스타일](conventions/코드%20스타일.md)
