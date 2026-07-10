# Tasklog

Tasklog는 대시보드 기반의 칸반 스타일 할 일 관리 서비스입니다. 대시보드를 만들고 컬럼과 카드로 업무를 정리하며, 팀원을 초대해 함께 관리할 수 있습니다.

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

## 프로젝트 구조

```
src/
├── actions/     # 서버 액션 (auth, comment, dashboard, setting 등)
├── api/         # API 클라이언트 및 데이터 페칭
├── app/         # App Router 페이지 및 레이아웃
├── assets/      # 이미지 및 아이콘
└── components/  # 공통 UI 컴포넌트
```
