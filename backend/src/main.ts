import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // CORS 설정
  const corsOrigin = configService.get('CORS_ORIGIN');
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });
  
  // 유효성 검증 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  // API 접두사 설정
  app.setGlobalPrefix('api');
  
  // Render에서는 PORT 환경 변수를 사용
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();