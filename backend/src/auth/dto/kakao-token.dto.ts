import { IsString, IsNotEmpty } from 'class-validator';

export class KakaoTokenDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}