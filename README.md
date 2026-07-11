# 📊 Tasklog

> **Based on:** [Taskify](https://github.com/Useung0830/2-team-taskify)
>
> 팀 단위 개발이 종료되어, Taskify를 리브랜딩하고 리팩토링 및 유지보수를 위해 개인 Vercel 프로젝트로 배포했습니다.

Tasklog는 대시보드 기반의 칸반 스타일 할 일 관리 서비스입니다. 대시보드를 만들고 컬럼과 카드로 업무를 정리할 수 있으며, 멤버를 초대해 팀 단위의 협업 일정관리도 가능합니다.

## 주요 기능

- **대시보드 관리**: 대시보드 생성/수정/삭제
- **칸반 보드**: 컬럼 및 카드 생성/수정/삭제, 상태별 업무 관리
- **댓글**: 카드별 댓글 작성
- **팀원 초대 및 관리**: 대시보드 초대, 멤버 목록 조회 및 관리
- **인증**: 로그인/회원가입, 계정 설정(비밀번호 변경 등)
- **마이페이지 / 내 대시보드**: 참여 중인 대시보드와 초대 목록 확인

## 기술 스택

- [Next.js](https://nextjs.org) (App Router)
- React 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- [TanStack Query](https://tanstack.com/query)
- ESLint / Prettier / Husky (lint-staged)

## Getting Started

먼저 의존성을 설치합니다.

```bash
npm install
```

개발 서버를 실행합니다.

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 결과를 확인할 수 있습니다.

## 환경 변수

루트에 `.env.local` 파일을 생성하고 아래 값을 설정해야 합니다.

```bash
NEXT_PUBLIC_BASE_URL= # API 서버 base URL
```

## 스크립트

```bash
npm run dev     # 개발 서버 실행
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # ESLint 검사 및 자동 수정
```

## 코드 품질

Husky + lint-staged로 커밋 전 검사를 자동화했습니다. `git commit` 시 스테이징된 파일에 대해 다음이 자동 실행됩니다.

- `*.{ts,tsx,js,jsx}`: ESLint(`--fix`) → Prettier
- `*.{json,md}`: Prettier

## 컨벤션

프로젝트 컨벤션은 [`conventions/`](conventions) 폴더의 문서를 참고하세요.

- [git 규칙](conventions/git%20규칙.md)
- [네이밍 규칙](conventions/네이밍%20규칙.md)
- [디렉터리 구조](conventions/디렉터리%20구조.md)
- [코드 스타일](conventions/코드%20스타일.md)

## 프로젝트 구조

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
