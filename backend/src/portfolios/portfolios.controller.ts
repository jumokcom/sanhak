import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfoliosService } from './portfolios.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('portfolios')
export class PortfoliosController {
  constructor(
    private readonly portfoliosService: PortfoliosService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  // 모든 포트폴리오 조회 (로그인 불필요)
  @Get()
  findAll() {
    return this.portfoliosService.findAll();
  }

  // 내 포트폴리오 조회 (로그인 필요)
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMyPortfolios(@Request() req) {
    return this.portfoliosService.findByUserId(req.user.id);
  }

  // 특정 포트폴리오 조회
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portfoliosService.findOne(+id);
  }

  // 포트폴리오 생성 (로그인 필요)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPortfolioDto: any) {
    return this.portfoliosService.create({
      ...createPortfolioDto,
      userId: req.user.id,
    });
  }

  // 포트폴리오 업데이트 (로그인 필요)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updatePortfolioDto: any,
  ) {
    return this.portfoliosService.update(+id, updatePortfolioDto);
  }

  // 포트폴리오 삭제 (로그인 필요)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portfoliosService.remove(+id);
  }

  // 이미지 업로드 (Cloudinary 사용)
  @UseGuards(JwtAuthGuard)
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    console.log('📝 이미지 업로드 요청 도착');
    console.log('📁 파일 정보:', file ? {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      hasBuffer: !!file.buffer
    } : 'No file');
    
    if (!file) {
      console.log('❌ 파일이 없음');
      throw new BadRequestException('이미지 파일이 필요합니다.');
    }

    // 파일 타입 검증
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      console.log('❌ 지원되지 않는 파일 타입:', file.mimetype);
      throw new BadRequestException('지원되지 않는 이미지 형식입니다.');
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      console.log('❌ 파일 크기 초과:', file.size, 'bytes');
      throw new BadRequestException('이미지 크기는 10MB를 초과할 수 없습니다.');
    }

    try {
      console.log('🌄 Cloudinary 업로드 시작...');
      // Cloudinary에 업로드
      const imageUrl = await this.cloudinaryService.uploadImage(file, 'portfolios');
      
      console.log('✅ 업로드 성공:', imageUrl);
      return {
        message: '이미지 업로드 성공',
        imageUrl,
        filename: file.originalname,
      };
    } catch (error) {
      console.log('❌ Cloudinary 업로드 실패:', error.message);
      throw new BadRequestException('이미지 업로드에 실패했습니다.');
    }
  }
}
