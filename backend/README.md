# 산학협력 포트폴리오 시스템 - Backend

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## 📋 개요

NestJS 기반의 포트폴리오 관리 시스템 백엔드 API입니다. RESTful API를 제공하며, JWT 인증, 카카오 로그인, 파일 업로드, Keep-Alive 기능을 지원합니다.

## 🚀 주요 기능

- 🔐 **JWT 인증**: 안전한 토큰 기반 인증 시스템
- 🌐 **카카오 로그인**: 소셜 로그인 지원
- 📄 **포트폴리오 CRUD**: 생성, 조회, 수정, 삭제
- 📂 **파일 업로드**: 이미지 및 문서 파일 업로드
- 🏥 **Keep-Alive**: 무료 호스팅 슬립 모드 방지
- 🛡️ **권한 관리**: 사용자별 데이터 접근 제어
- 🔍 **API 문서**: Swagger 자동 문서화

## 🛠️ 기술 스택

- **NestJS 11** - Progressive Node.js framework
- **TypeScript** - 타입 안전성 보장
- **TypeORM** - Object-Relational Mapping
- **PostgreSQL** - 관계형 데이터베이스
- **Passport** - 인증 미들웨어
- **JWT** - JSON Web Token
- **Multer** - 파일 업로드 처리
- **bcrypt** - 비밀번호 암호화

## 📁 프로젝트 구조

```
backend/
├── src/
│   ├── auth/                 # 인증 모듈
│   │   ├── dto/             # Data Transfer Objects
│   │   ├── guards/          # 인증 가드
│   │   ├── strategies/      # Passport 전략
│   │   └── auth.service.ts
│   ├── users/               # 사용자 모듈
│   │   ├── entities/        # 사용자 엔티티
│   │   ├── dto/
│   │   └── users.service.ts
│   ├── portfolios/          # 포트폴리오 모듈
│   │   ├── entities/        # 포트폴리오 엔티티
│   │   ├── dto/
│   │   └── portfolios.service.ts
│   ├── app.controller.ts    # 메인 컨트롤러
│   ├── app.service.ts       # 메인 서비스
│   ├── keep-alive.service.ts # Keep-Alive 서비스
│   └── main.ts              # 애플리케이션 진입점
├── uploads/                 # 업로드된 파일 저장소
├── test/                    # 테스트 파일
└── package.json
```

## 🔧 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
# 데이터베이스
DATABASE_URL=postgresql://username:password@localhost:5432/database_name

# JWT
JWT_SECRET=your-super-secret-jwt-key

# 카카오 로그인
KAKAO_CLIENT_ID=your-kakao-app-key
KAKAO_CALLBACK_URL=http://localhost:3001/api/auth/kakao/callback

# CORS
CORS_ORIGIN=http://localhost:3000

# Keep-Alive (프로덕션용)
SERVER_URL=https://your-backend-domain.com

# 포트 (Render에서 자동 설정)
PORT=3001
```

### 3. 개발 서버 실행

```bash
# 개발 모드 (자동 재시작)
npm run start:dev

# 일반 실행
npm run start

# 프로덕션 빌드 후 실행
npm run build
npm run start:prod
```

## 🧪 테스트

```bash
# 단위 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov

# 테스트 감시 모드
npm run test:watch
```

## 📡 API 엔드포인트

### 🔑 인증 (Authentication)

```
POST   /api/auth/kakao              # 카카오 로그인
GET    /api/auth/profile            # 사용자 프로필 조회
```

### 👤 사용자 (Users)

```
GET    /api/users/me                # 내 정보 조회
PATCH  /api/users/me                # 내 정보 수정
```

### 📄 포트폴리오 (Portfolios)

```
GET    /api/portfolios              # 모든 포트폴리오 조회
GET    /api/portfolios/my           # 내 포트폴리오 조회
GET    /api/portfolios/:id          # 특정 포트폴리오 조회
POST   /api/portfolios              # 포트폴리오 생성
PATCH  /api/portfolios/:id          # 포트폴리오 수정
DELETE /api/portfolios/:id          # 포트폴리오 삭제
```

### 🏥 상태 확인 (Health Check)

```
GET    /health                      # 서버 상태 확인
GET    /keep-alive                  # Keep-Alive 엔드포인트
```

### 📁 파일 업로드

```
POST   /api/portfolios/upload       # 파일 업로드
```

## 🌍 배포 (Render)

### 1. 환경 설정

- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run start:prod`
- **Node Version**: 18+

### 2. 환경변수 설정

Render 대시보드에서 다음 환경변수들을 설정:

- `DATABASE_URL` - PostgreSQL 연결 문자열
- `JWT_SECRET` - JWT 비밀키
- `KAKAO_CLIENT_ID` - 카카오 앱 키
- `KAKAO_CALLBACK_URL` - 배포된 콜백 URL
- `CORS_ORIGIN` - 프론트엔드 도메인
- `SERVER_URL` - 배포된 백엔드 URL

### 3. Keep-Alive 설정

프로덕션 환경에서 자동으로 활성화되어 10분마다 자기 자신에게 요청을 보내 슬립 모드를 방지합니다.

## 🔒 보안 설정

- **CORS**: 허용된 도메인에서만 접근 가능
- **JWT**: 안전한 토큰 기반 인증
- **Validation**: 입력 데이터 유효성 검증
- **Guards**: 라우트 레벨 권한 제어
- **bcrypt**: 비밀번호 암호화

## 📊 데이터베이스 스키마

### Users 테이블

```sql
- id: Primary Key
- kakaoId: 카카오 사용자 ID
- nickname: 사용자 닉네임
- email: 이메일
- profileImage: 프로필 이미지 URL
- createdAt: 생성일시
- updatedAt: 수정일시
```

### Portfolios 테이블

```sql
- id: Primary Key
- title: 제목
- description: 설명
- content: 포트폴리오 내용 (JSON)
- isPublic: 공개 여부
- userId: 작성자 ID (Foreign Key)
- createdAt: 생성일시
- updatedAt: 수정일시
```

## 🐛 디버깅

### 로그 확인

```bash
# 개발 환경 로그
npm run start:dev

# 프로덕션 로그 (Render)
# Render 대시보드의 Logs 탭에서 확인
```

### 일반적인 문제 해결

1. **데이터베이스 연결 실패**

   - `DATABASE_URL` 환경변수 확인
   - PostgreSQL 서버 상태 확인

2. **카카오 로그인 실패**

   - `KAKAO_CLIENT_ID` 확인
   - 카카오 개발자 콘솔에서 Redirect URI 설정 확인

3. **CORS 에러**
   - `CORS_ORIGIN` 환경변수에 프론트엔드 도메인 추가

## 🤝 개발 가이드

### 새 모듈 추가

```bash
# 모듈 생성
nest g module module-name

# 컨트롤러 생성
nest g controller module-name

# 서비스 생성
nest g service module-name
```

### 코드 스타일

```bash
# 린트 검사
npm run lint

# 린트 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format
```

---

🔗 **관련 링크**

- [NestJS 공식 문서](https://docs.nestjs.com/)
- [TypeORM 문서](https://typeorm.io/)
- [Passport.js 문서](https://www.passportjs.org/)
