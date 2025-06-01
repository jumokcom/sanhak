# Cloudinary 설정 가이드

## 1. Cloudinary 계정 생성
1. https://cloudinary.com 접속
2. 무료 계정 생성 (매월 25GB 무료)
3. Dashboard에서 다음 정보 확인:
   - Cloud Name
   - API Key
   - API Secret

## 2. 환경변수 설정

### 개발환경 (.env)
```bash
# Cloudinary 설정
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 프로덕션 환경 (Render)
Render 대시보드 > Environment Variables에 추가:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## 3. 장점
- ✅ **파일 손실 방지**: 서버 재시작해도 이미지 유지
- ✅ **자동 최적화**: 이미지 크기/품질 자동 조정
- ✅ **CDN 제공**: 전세계 빠른 이미지 로딩
- ✅ **변환 기능**: 실시간 리사이징/크롭
- ✅ **무료 용량**: 매월 25GB + 25,000 변환

## 4. 사용법
기존 업로드 API는 그대로 사용하면 자동으로 Cloudinary에 저장됩니다.

```typescript
// 프론트엔드에서는 변경 없음
const formData = new FormData();
formData.append('image', file);

const response = await fetch('/api/portfolios/upload/image', {
  method: 'POST',
  body: formData,
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## 5. 마이그레이션
기존 로컬 이미지들은 자동으로 마이그레이션되지 않습니다.
새로 업로드되는 이미지들만 Cloudinary에 저장됩니다.
