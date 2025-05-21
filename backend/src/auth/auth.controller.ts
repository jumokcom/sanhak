import { Controller, Post, Body, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { KakaoTokenDto } from './dto/kakao-token.dto';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // 프론트엔드에서 전달받은 카카오 액세스 토큰으로 로그인
  @Post('kakao/token')
  async kakaoLogin(@Body() kakaoTokenDto: KakaoTokenDto) {
    return this.authService.loginWithKakaoToken(kakaoTokenDto.accessToken);
  }

  // 백엔드에서 직접 카카오 로그인 처리하는 경우 (서버 측 로직)
  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {
    // 카카오 로그인 페이지로 리다이렉트
    return;
  }

  // 카카오 인증 후 콜백 처리
  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthRedirect(@Req() req, @Res() res: Response) {
    // req.user는 KakaoStrategy의 validate 메서드에서 반환된 사용자 정보
    const user = req.user;
    
    // JWT 토큰 생성 - authService를 통해 토큰 생성
    const result = await this.authService.loginWithKakaoToken(user.kakaoAccessToken);
    const token = result.access_token;
    
    // 프론트엔드로 리다이렉트 (토큰 포함)
    const clientUrl = this.configService.get<string>('CORS_ORIGIN');
    return res.redirect(`${clientUrl}/auth/callback?token=${token}`);
  }
}