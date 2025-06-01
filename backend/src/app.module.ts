import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { User } from './users/entities/user.entity';
import { Portfolio } from './portfolios/entities/portfolio.entity';
import { KeepAliveService } from './keep-alive.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        // 데이터베이스 URL 전체를 가져오기
        const databaseUrl = configService.get<string>('DATABASE_URL');
        
        // 연결 정보 로깅 (비밀번호는 마스킹)
        const maskedUrl = databaseUrl?.replace(/:(.*?)@/, ':***@');
        console.log('Using database URL:', maskedUrl);
        
        return {
          type: 'postgres',
          url: databaseUrl,
          entities: [User, Portfolio],
          synchronize: true,
          ssl: {
            rejectUnauthorized: false
          },
          // 추가 연결 옵션
          connectTimeoutMS: 10000, // 연결 타임아웃 증가
          maxQueryExecutionTime: 10000 // 쿼리 실행 타임아웃 증가
        };
      },
    }),
    AuthModule,
    UsersModule,
    PortfoliosModule,
  ],
  controllers: [AppController],
  providers: [AppService, KeepAliveService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    console.log('NODE_ENV:', configService.get('NODE_ENV'));
    console.log('Database URL set:', configService.get('DATABASE_URL') ? 'Yes' : 'No');
    console.log('JWT_SECRET set:', configService.get('JWT_SECRET') ? 'Yes' : 'No');
    console.log('KAKAO_CLIENT_ID set:', configService.get('KAKAO_CLIENT_ID') ? 'Yes' : 'No');
    console.log('KAKAO_CALLBACK_URL set:', configService.get('KAKAO_CALLBACK_URL') ? 'Yes' : 'No');
  }
}