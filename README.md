# 산학협력 포트폴리오 시스템

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

## 📋 프로젝트 개요

산학협력 프로젝트를 위한 포트폴리오 관리 시스템입니다. 학생들이 자신의 프로젝트와 기술 스택을 체계적으로 관리하고 공유할 수 있도록 설계되었습니다.

## 🚀 주요 기능

- ✨ **포트폴리오 생성 및 편집**: 직관적인 UI로 포트폴리오 작성
- 👤 **사용자 인증**: 카카오 로그인 지원
- 📄 **PDF 출력**: 포트폴리오를 PDF로 내보내기
- 🔒 **권한 관리**: 본인 포트폴리오만 수정 가능
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- 🌐 **Keep-Alive**: 무료 호스팅에서 서버 유지 기능

## 🛠️ 기술 스택

### Frontend
- **React 19** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Styled Components** - CSS-in-JS
- **React Router** - 라우팅
- **html2canvas + jsPDF** - PDF 생성

### Backend
- **NestJS** - Node.js 프레임워크
- **TypeORM** - ORM
- **PostgreSQL** - 데이터베이스
- **JWT** - 인증
- **Passport** - 인증 미들웨어
- **Multer** - 파일 업로드

### DevOps & Deployment
- **Render** - 호스팅
- **GitHub Actions** - CI/CD 및 Keep-Alive
- **PostgreSQL Cloud** - 데이터베이스 호스팅

## 📁 프로젝트 구조

```
sanhak/
├── frontend/                 # React 프론트엔드
│   ├── src/
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   ├── pages/          # 페이지 컴포넌트
│   │   ├── hooks/          # 커스텀 훅
│   │   ├── utils/          # 유틸리티 함수
│   │   ├── styles/         # 스타일 관련
│   │   └── types/          # TypeScript 타입 정의
│   ├── public/
│   └── package.json
├── backend/                  # NestJS 백엔드
│   ├── src/
│   │   ├── auth/           # 인증 모듈
│   │   ├── users/          # 사용자 모듈
│   │   ├── portfolios/     # 포트폴리오 모듈
│   │   └── main.ts
│   └── package.json
├── .github/
│   └── workflows/
│       └── keep-alive.yml  # GitHub Actions Keep-Alive
└── README.md
```

## 🚦 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd sanhak
```

### 2. 백엔드 설정
```bash
cd backend
npm install

# 환경변수 설정
cp .env.example .env
# .env 파일에 데이터베이스 및 JWT 설정

# 개발 서버 실행
npm run start:dev
```

### 3. 프론트엔드 설정
```bash
cd frontend
npm install

# 환경변수 설정 (선택사항)
# .env 파일에 API URL 설정

# 개발 서버 실행
npm start
```

## 🌍 배포

### Backend (Render)
1. Render에 GitHub 연결
2. Build Command: `npm install && npm run build`
3. Start Command: `npm run start:prod`
4. 환경변수 설정:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `KAKAO_CLIENT_ID`
   - `KAKAO_CALLBACK_URL`

### Frontend (Render/Netlify/Vercel)
1. Build Command: `npm run build`
2. Publish Directory: `build`
3. 환경변수 설정:
   - `REACT_APP_API_URL`

## 🔧 Keep-Alive 시스템

무료 호스팅의 슬립 모드를 방지하기 위한 3중 보안 시스템:

1. **백엔드 자체 Keep-Alive**: 10분마다 자기 자신에게 요청
2. **프론트엔드 Keep-Alive**: 사용자 접속 시 추가 요청
3. **GitHub Actions**: 외부에서 10분마다 자동 요청

## 📱 주요 페이지

- `/` - 메인 페이지 (포트폴리오 목록)
- `/edit` - 새 포트폴리오 작성
- `/edit/:id` - 기존 포트폴리오 수정
- `/view/:id` - 포트폴리오 조회

## 🔑 API 엔드포인트

### 인증
- `POST /api/auth/kakao` - 카카오 로그인
- `GET /api/auth/profile` - 사용자 프로필

### 포트폴리오
- `GET /api/portfolios` - 모든 포트폴리오 조회
- `GET /api/portfolios/my` - 내 포트폴리오 조회
- `POST /api/portfolios` - 포트폴리오 생성
- `PATCH /api/portfolios/:id` - 포트폴리오 수정
- `DELETE /api/portfolios/:id` - 포트폴리오 삭제

### Keep-Alive
- `GET /health` - 서버 상태 확인
- `GET /keep-alive` - Keep-Alive 엔드포인트

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 👥 팀

- **개발자**: [이름]
- **지도교수**: [교수님 이름]
- **산업체**: [회사 이름]

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해주세요.

---

⭐ 이 프로젝트가 도움이 되셨다면 스타를 눌러주세요!
