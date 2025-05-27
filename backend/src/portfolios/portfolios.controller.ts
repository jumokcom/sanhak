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
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { join } from 'path';
import { PortfoliosService } from './portfolios.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

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

  // 이미지 업로드 (로그인 필요)
  @UseGuards(JwtAuthGuard)
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ) {
    if (!file) {
      throw new Error('이미지 파일이 필요합니다.');
    }

    // API_BASE_URL을 포함한 전체 URL로 반환
    const API_BASE_URL = process.env.NODE_ENV === 'production' 
      ? 'https://sanhak-backend.onrender.com'
      : 'http://localhost:3001';
    
    const imageUrl = `${API_BASE_URL}/api/portfolios/images/${file.filename}`;
    
    return {
      message: '이미지 업로드 성공',
      imageUrl,
      filename: file.filename,
    };
  }

  // 이미지 서빙
  @Get('images/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const imagePath = join(__dirname, '..', '..', 'uploads', 'portfolios', filename);
      console.log('이미지 경로:', imagePath);
      return res.sendFile(imagePath);
    } catch (error) {
      console.error('이미지 서빙 에러:', error);
      return res.status(404).json({ message: '이미지를 찾을 수 없습니다.' });
    }
  }
}
