# Keep-Alive 외부 서비스 설정 가이드

## 1. cron-job.org (추천)
1. https://cron-job.org 접속
2. 무료 계정 생성
3. 새 크론 작업 생성:
   - URL: https://sanhak-backend.onrender.com/keep-alive
   - 스케줄: */10 * * * * (10분마다)
   - HTTP Method: GET

## 2. UptimeRobot
1. https://uptimerobot.com 접속  
2. 무료 계정 생성 (50개 모니터 무료)
3. 새 모니터 추가:
   - Monitor Type: HTTP(s)
   - URL: https://sanhak-backend.onrender.com/health
   - Monitoring Interval: 5분

## 3. Pingdom (제한적 무료)
1. https://pingdom.com 접속
2. 무료 계정 생성
3. 웹사이트 모니터링 설정

## 4. GitHub Actions (추천 - 개발자 친화적)
아래 파일을 .github/workflows/keep-alive.yml로 생성:

```yaml
name: Keep Alive

on:
  schedule:
    - cron: '*/10 * * * *' # 10분마다
  workflow_dispatch: # 수동 실행 가능

jobs:
  keep-alive:
    runs-on: ubuntu-latest
    steps:
    - name: Keep server alive
      run: |
        curl -f https://sanhak-backend.onrender.com/keep-alive || exit 1
    - name: Check health
      run: |
        curl -f https://sanhak-backend.onrender.com/health || exit 1
```

## 5. 구글 클라우드 함수 (무료 티어)
1. Google Cloud Platform 계정 생성
2. Cloud Functions 서비스 이용
3. 주기적으로 실행되는 함수 작성

## 권장사항
- **백엔드 자체 Keep-Alive + 외부 서비스** 조합 사용
- 여러 외부 서비스를 동시에 사용하여 이중화
- 모니터링 결과를 슬랙이나 이메일로 알림 설정
