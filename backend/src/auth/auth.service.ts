import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateKakaoUser(kakaoUserData: any): Promise<User> {
    const { kakaoId } = kakaoUserData;
    
    // 카카오 ID로 사용자 검색
    let user = await this.usersService.findByKakaoId(kakaoId);
    
    // 사용자가 없으면 새로 생성
    if (!user) {
      user = await this.usersService.createUser({
        ...kakaoUserData,
        isVerified: true, // 카카오 로그인은 이미 검증됨
      });
    } else {
      // 기존 사용자 정보 업데이트
      const updatedUser = await this.usersService.updateUser(user.id, {
        kakaoAccessToken: kakaoUserData.kakaoAccessToken,
      });
      
      // 업데이트된 사용자 정보가 있으면 사용
      if (updatedUser) {
        user = updatedUser;
      }
    }
    
    return user;
  }

  // 프론트엔드에서 받은 카카오 토큰으로 사용자 정보 조회
  async loginWithKakaoToken(accessToken: string): Promise<{access_token: string}> {
    try {
      // 카카오 API로 사용자 정보 조회
      const kakaoUserInfo = await this.getKakaoUserInfo(accessToken);
      
      // 카카오 ID로 사용자 조회 또는 생성
      const user = await this.validateKakaoUser({
        kakaoId: kakaoUserInfo.id.toString(),
        name: kakaoUserInfo.properties?.nickname,
        email: kakaoUserInfo.kakao_account?.email,
        profileImage: kakaoUserInfo.properties?.profile_image,
        kakaoAccessToken: accessToken,
      });
      
      // JWT 토큰 생성
      const payload = { sub: user.id, email: user.email };
      
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
      throw new Error('카카오 로그인 인증에 실패했습니다.');
    }
  }

  // 직접 JWT 토큰을 생성하는 메서드 추가
  createToken(userId: string, email: string): string {
    const payload = { sub: userId, email };
    return this.jwtService.sign(payload);
  }

  // 카카오 API로 사용자 정보 조회
  private async getKakaoUserInfo(accessToken: string): Promise<any> {
    const response = await fetch('https://kapi.kakao.com/v2/user/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    
    if (!response.ok) {
      throw new Error('카카오 API 호출에 실패했습니다.');
    }
    
    return response.json();
  }
}