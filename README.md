# Dasida - 재미있는 복습을 위한 퀴즈 앱

에빙하우스 망각 곡선 이론에 기반하여 학습 내용을 효과적으로 복습하고 장기 기억으로 전환할 수 있도록 돕는 퀴즈 애플리케이션입니다. "재미있게, 효율적으로, 저항감 없이 복습하자!"라는 슬로건 아래, 사용자의 꾸준한 학습을 지원합니다.

## ✨ 주요 기능

- **🧠 지식 추가:** 새로운 학습 내용을 입력하면 AI가 자동으로 관련 퀴즈를 생성하여 복습을 돕습니다.
- **📚 지식 리스트:** 저장된 학습 내용을 목록 형태로 확인하고, 각 항목을 상세히 보거나 수정, 삭제할 수 있습니다.
- **✍️ 지식 수정 및 상세보기:** 입력했던 학습 내용을 언제든지 다시 보거나 업데이트할 수 있습니다.
- **🏠 홈화면:**
    - **로그인 시:** 풀어야 할 "오늘의 퀴즈"가 있다면 바로 보여주고, 없다면 새로운 지식을 추가하는 화면으로 안내합니다.
    - **비로그인 시:** "시작하러 가기" 버튼을 통해 로그인 및 학습 시작을 유도합니다.
- **📝 오답 노트:** 틀린 문제만 모아보고, "해설 보기"를 통해 부족한 부분을 다시 학습할 수 있습니다.

## 🚀 시작하기

### 1. 사전 요구 사항

- [Node.js](https://nodejs.org/ko/) (LTS 버전 권장)
- [Yarn](https://yarnpkg.com/) 또는 npm

### 2. 설치

```bash
# 저장소를 복제합니다.
git clone https://github.com/your-username/dasida.git

# 프로젝트 디렉터리로 이동합니다.
cd dasida

# 의존성을 설치합니다.
yarn install
# 또는
npm install
```

### 3. 실행

```bash
# 개발 서버를 실행합니다.
yarn dev
# 또는
npm run dev
```

애플리케이션은 `http://localhost:5173` 에서 실행됩니다.

## 🛠️ 기술 스택

- **Frontend:** React, Vite
- **Styling:** Styled-Components
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Routing:** React Router
- **Linting:** ESLint

## 📁 프로젝트 구조

```
.
├── public/              # 정적 에셋
├── src/
│   ├── api/             # API 호출 함수
│   ├── assets/          # 이미지, 폰트 등
│   ├── components/      # 공통 컴포넌트
│   ├── hooks/           # 커스텀 훅
│   ├── pages/           # 페이지 컴포넌트
│   ├── store/           # Zustand 스토어
│   ├── style/           # 전역 스타일
│   └── App.tsx          # 메인 애플리케이션 컴포넌트
├── package.json         # 프로젝트 의존성 및 스크립트
└── vite.config.ts       # Vite 설정 파일
```

## 📄 라이선스

이 프로젝트는 [MIT 라이선스](LICENSE)를 따릅니다.