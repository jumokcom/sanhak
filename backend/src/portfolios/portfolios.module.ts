import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosController } from './portfolios.controller';
import { Portfolio } from './entities/portfolio.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, callback) => {
          const uploadPath = join(__dirname, '..', '..', 'uploads', 'portfolios');
          // 디렉토리가 없으면 생성
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          callback(null, uploadPath);
        },
        filename: (req, file, callback) => {
          // 파일명 생성: timestamp_userId_originalname
          const userId = (req as any).user?.id || 'anonymous';
          const timestamp = Date.now();
          const ext = extname(file.originalname);
          const filename = `${timestamp}_${userId}_portfolio${ext}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        // 이미지 파일만 허용
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB 제한
      },
    }),
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}
