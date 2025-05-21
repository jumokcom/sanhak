import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    const clientId = configService.get<string>('KAKAO_CLIENT_ID');
    const callbackUrl = configService.get<string>('KAKAO_CALLBACK_URL');
    
    if (!clientId) {
      throw new Error('KAKAO_CLIENT_ID is not defined in environment variables');
    }
    
    if (!callbackUrl) {
      throw new Error('KAKAO_CALLBACK_URL is not defined in environment variables');
    }
    
    super({
      clientID: clientId,
      callbackURL: callbackUrl,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { id, username, _json } = profile;
    const kakaoAccount = _json.kakao_account;
    
    const userInfo = {
      kakaoId: id.toString(),
      name: username || kakaoAccount?.profile?.nickname || '카카오 사용자',
      email: kakaoAccount?.email,
      profileImage: kakaoAccount?.profile?.profile_image_url,
      kakaoAccessToken: accessToken,
    };

    // 카카오 ID로 사용자 조회 또는 생성
    const user = await this.authService.validateKakaoUser(userInfo);
    
    return done(null, user);
  }
}