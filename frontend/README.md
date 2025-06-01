# 산학협력 포트폴리오 시스템 - Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## 📋 개요

React 기반의 포트폴리오 관리 시스템 프론트엔드입니다. 직관적인 UI/UX를 제공하며, 반응형 디자인과 PDF 출력 기능을 지원합니다.

## 🚀 주요 기능

- ✨ **직관적인 포트폴리오 편집기**: 드래그 앤 드롭 방식의 편집 환경
- 🔐 **카카오 로그인**: 간편한 소셜 로그인
- 📄 **PDF 출력**: 포트폴리오를 고품질 PDF로 다운로드
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- 🌐 **Keep-Alive**: 백엔드 서버 자동 유지 기능
- 🎨 **현대적인 UI**: 깔끔하고 세련된 인터페이스
- 🔄 **실시간 미리보기**: 편집 중 실시간 결과 확인

## 🛠️ 기술 스택

- **React 19** - 최신 React 버전
- **TypeScript** - 타입 안전성 보장
- **Styled Components** - CSS-in-JS 스타일링
- **React Router DOM 7** - 클라이언트 사이드 라우팅
- **html2canvas** - DOM을 캔버스로 변환
- **jsPDF** - PDF 생성 라이브러리
- **React Kakao Login** - 카카오 로그인 컴포넌트

## 📁 프로젝트 구조

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/          # 재사용 가능한 컴포넌트
│   │   ├── KeepAliveStatus.tsx  # Keep-Alive 상태 모니터
│   │   └── common/          # 공통 컴포넌트
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── MainPage.tsx     # 메인 페이지
│   │   ├── EditPage.tsx     # 편집 페이지
│   │   └── ViewPage.tsx     # 조회 페이지
│   ├── hooks/               # 커스텀 훅
│   │   ├── useKeepAlive.ts  # Keep-Alive 훅
│   │   └── useNetworkStatus.ts  # 네트워크 상태 훅
│   ├── utils/               # 유틸리티 함수
│   │   ├── api.ts           # API 통신
│   │   └── pdfGenerator.ts  # PDF 생성
│   ├── styles/              # 스타일 관련
│   │   └── GlobalStyle.ts   # 전역 스타일
│   ├── types/               # TypeScript 타입 정의
│   ├── App.tsx              # 메인 App 컴포넌트
│   └── index.tsx            # 애플리케이션 진입점
├── .env                     # 개발 환경변수
├── .env.production          # 프로덕션 환경변수
└── package.json
```

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정 (선택사항)

`.env` 파일을 생성하여 API URL을 설정할 수 있습니다:

```env
# 백엔드 API URL (기본값: http://localhost:3001/api)
REACT_APP_API_URL=http://localhost:3001/api
```

프로덕션용 `.env.production` 파일:

```env
# 프로덕션 백엔드 URL
REACT_APP_API_URL=https://sanhak-backend.onrender.com/api
```

### 3. 개발 서버 실행

```bash
# 개발 서버 시작 (http://localhost:3000)
npm start

# 프로덕션 빌드
npm run build

# 빌드 결과 테스트
npm run serve
```

## 🧪 테스트

```bash
# 테스트 실행
npm test

# 테스트 감시 모드
npm run test:watch

# 테스트 커버리지
npm run test:coverage
```

## 📱 주요 페이지

### 🏠 메인 페이지 (`/`)

- 포트폴리오 목록 조회
- 카카오 로그인
- 새 포트폴리오 생성 버튼

### ✏️ 편집 페이지 (`/edit`, `/edit/:id`)

- 포트폴리오 작성/수정
- 실시간 미리보기
- 임시저장 기능

### 👁️ 조회 페이지 (`/view/:id`)

- 포트폴리오 상세 보기
- PDF 다운로드
- 공유 기능

## 🌐 Keep-Alive 시스템

무료 호스팅 환경에서 백엔드 서버가 슬립 모드로 전환되는 것을 방지하는 스마트한 시스템:

### 기능 특징

- **자동 핑**: 프로덕션 환경에서 10분마다 백엔드에 요청 전송
- **네트워크 감지**: 오프라인 상태에서는 불필요한 요청 방지
- **스마트 재연결**: 네트워크 복구 시 자동으로 Keep-Alive 재시작
- **상태 모니터링**: 개발 환경에서 실시간 상태 확인 가능
- **에러 핸들링**: 네트워크 오류 시 자동 재시도

### 환경별 동작

- **개발 환경**: Keep-Alive 비활성화, 상태 모니터만 표시
- **프로덕션 환경**: Keep-Alive 활성화, 상태 모니터 숨김
- **모바일 환경**: 상태 모니터 자동 숨김

## 📄 PDF 출력 기능

### 지원 기능

- **고품질 렌더링**: html2canvas를 사용한 정확한 DOM 캡처
- **페이지 최적화**: A4 크기에 맞는 자동 레이아웃 조정
- **폰트 지원**: 한글 폰트 완벽 지원
- **이미지 처리**: 고해상도 이미지 유지

### 사용법

```typescript
import { generatePDF } from "../utils/pdfGenerator";

// PDF 생성
const handlePDFDownload = async () => {
  await generatePDF("portfolio-container", "my-portfolio.pdf");
};
```

## 🎨 스타일링 가이드

### Styled Components 사용법

```typescript
import styled from "styled-components";

const StyledButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;
```

### 반응형 디자인

```typescript
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;
```

## 🔗 API 통신

### API 호출 예시

```typescript
import { portfolioApi } from "../utils/api";

// 포트폴리오 목록 조회
const portfolios = await portfolioApi.getAllPortfolios();

// 포트폴리오 생성
const newPortfolio = await portfolioApi.createPortfolio({
  title: "새 포트폴리오",
  description: "설명",
  content: portfolioData,
});
```

### 에러 처리

```typescript
try {
  const result = await portfolioApi.getPortfolio(id);
} catch (error) {
  console.error("포트폴리오 로드 실패:", error.message);
  // 사용자에게 에러 메시지 표시
}
```

## 🌍 배포

### Render 배포

1. **빌드 설정**:

   - Build Command: `npm run build`
   - Publish Directory: `build`

2. **환경변수 설정**:
   - `REACT_APP_API_URL`: 배포된 백엔드 URL

### Netlify 배포

1. GitHub 연결
2. Build Command: `npm run build`
3. Publish Directory: `build`
4. Environment Variables에 `REACT_APP_API_URL` 추가

### Vercel 배포

1. Vercel CLI 설치: `npm i -g vercel`
2. 배포: `vercel --prod`
3. 환경변수 설정: Vercel 대시보드에서 설정

## 🔧 개발 도구

### 코드 품질

```bash
# ESLint 검사
npm run lint

# Prettier 포맷팅
npm run format

# 타입 검사
npm run type-check
```

### 번들 분석

```bash
# 번들 크기 분석
npm run analyze

# 의존성 업데이트 확인
npm outdated
```

## 🐛 문제 해결

### 일반적인 문제들

1. **API 연결 실패**

   - `REACT_APP_API_URL` 환경변수 확인
   - 백엔드 서버 상태 확인
   - CORS 설정 확인

2. **PDF 생성 실패**

   - 브라우저 호환성 확인 (Chrome 권장)
   - 이미지 로딩 완료 대기
   - 메모리 부족 시 페이지 크기 조정

3. **Keep-Alive 동작 안함**

   - 프로덕션 환경에서만 동작
   - 네트워크 연결 상태 확인
   - 브라우저 개발자 도구에서 요청 확인

4. **카카오 로그인 실패**
   - 카카오 개발자 콘솔에서 도메인 등록 확인
   - JavaScript 키 설정 확인

## 🤝 개발 가이드

### 새 컴포넌트 추가

```typescript
// components/NewComponent.tsx
import React from "react";
import styled from "styled-components";

interface NewComponentProps {
  title: string;
  children?: React.ReactNode;
}

const NewComponent: React.FC<NewComponentProps> = ({ title, children }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  );
};

const Container = styled.div`
  // 스타일 정의
`;

const Title = styled.h2`
  // 스타일 정의
`;

export default NewComponent;
```

### 커스텀 훅 작성

```typescript
// hooks/useLocalStorage.ts
import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("LocalStorage 저장 실패:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
};
```

---

🔗 **관련 링크**

- [React 공식 문서](https://react.dev/)
- [TypeScript 문서](https://www.typescriptlang.org/)
- [Styled Components 문서](https://styled-components.com/)
- [React Router 문서](https://reactrouter.com/)
