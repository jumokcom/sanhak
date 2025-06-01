import { Injectable, Logger, OnModuleInit } from '@nestjs/common';

@Injectable()
export class KeepAliveService implements OnModuleInit {
  private readonly logger = new Logger(KeepAliveService.name);
  private readonly serverUrl = process.env.SERVER_URL || 'https://sanhak-backend.onrender.com';
  private intervalId: NodeJS.Timeout | null = null;

  async handleKeepAlive() {
    // 프로덕션 환경에서만 실행
    if (process.env.NODE_ENV !== 'production') {
      return;
    }

    try {
      this.logger.log('🏓 Sending keep-alive ping to self...');
      
      const response = await fetch(`${this.serverUrl}/keep-alive`, {
        method: 'GET',
        headers: {
          'User-Agent': 'KeepAlive-Service/1.0',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.logger.log(`✅ Keep-alive successful: ${data.message}`);
      } else {
        this.logger.warn(`⚠️ Keep-alive response: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      this.logger.error(`❌ Keep-alive failed: ${error.message}`);
    }
  }

  // 서버 시작 시 타이머 시작
  async onModuleInit() {
    if (process.env.NODE_ENV === 'production') {
      this.logger.log('🚀 KeepAlive service initialized');
      
      // 30초 후에 첫 ping (서버 완전 시작 대기)
      setTimeout(() => {
        this.handleKeepAlive();
        
        // 10분(600,000ms)마다 반복 실행
        this.intervalId = setInterval(() => {
          this.handleKeepAlive();
        }, 10 * 60 * 1000);
        
      }, 30000);
    }
  }

  // 서비스 종료 시 타이머 정리
  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.logger.log('🛑 KeepAlive service stopped');
    }
  }
}
