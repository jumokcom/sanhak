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
} from '@nestjs/common';
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
}
