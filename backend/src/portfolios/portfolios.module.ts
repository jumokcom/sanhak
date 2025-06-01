import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './entities/portfolio.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    // Cloudinary를 사용하므로 Multer는 메모리 스토리지로 설정
    MulterModule.register({
      storage: memoryStorage(), // 메모리 스토리지 사용
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB 제한
        fieldSize: 10 * 1024 * 1024, // 필드 크기 제한
      },
    }),
    CloudinaryModule,
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}
