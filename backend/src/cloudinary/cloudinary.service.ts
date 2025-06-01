import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    // Cloudinary 설정
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });

    this.logger.log('🌤️ Cloudinary 서비스 초기화 완료');
  }

  /**
   * 이미지를 Cloudinary에 업로드
   */
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'portfolios'
  ): Promise<string> {
    try {
      this.logger.log(`📤 이미지 업로드 시작: ${file.originalname}`);
      this.logger.log(`📊 파일 사이즈: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      this.logger.log(`🎨 MIME 타입: ${file.mimetype}`);

      // Buffer 확인
      if (!file.buffer) {
        throw new Error('파일 버퍼가 없습니다.');
      }
      this.logger.log(`💾 버퍼 크기: ${file.buffer.length} bytes`);

      // Cloudinary 설정 확인
      const config = cloudinary.config();
      this.logger.log(`🌐 Cloudinary Cloud Name: ${config.cloud_name}`);
      this.logger.log(`🔑 API Key: ${config.api_key ? 'SET' : 'NOT SET'}`);
      this.logger.log(`🔐 API Secret: ${config.api_secret ? 'SET' : 'NOT SET'}`);

      this.logger.log('🚀 Cloudinary 업로드 시도 중...');
      
      // 전체 Base64 문자열 길이 확인
      const base64Data = file.buffer.toString('base64');
      this.logger.log(`📊 Base64 데이터 길이: ${base64Data.length} characters`);
      
      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${base64Data}`,
        {
          folder: `sanhak/${folder}`,
          resource_type: 'image',
          // 일단 변환 비활성화하여 테스트
          // transformation: [
          //   { width: 800, height: 800, crop: 'limit' },
          //   { quality: 'auto:good' },
          //   { format: 'auto' },
          // ],
        }
      );

      this.logger.log(`✅ 이미지 업로드 성공: ${result.secure_url}`);
      this.logger.log(`🆔 Public ID: ${result.public_id}`);
      return result.secure_url;
    } catch (error) {
      this.logger.error(`❌ 이미지 업로드 실패`);
      this.logger.error(`💬 에러 메시지: ${error?.message || 'Unknown error'}`);
      this.logger.error(`🔍 에러 코드: ${error?.http_code || 'No code'}`);
      this.logger.error(`🌐 에러 상세: ${JSON.stringify({
        name: error?.name,
        message: error?.message,
        http_code: error?.http_code,
        error: error?.error
      }, null, 2)}`);
      
      // 에러 메시지를 명확하게 전달
      const errorMessage = error?.message || error?.error?.message || '알 수 없는 오류가 발생했습니다';
      throw new Error(`Cloudinary 업로드 실패: ${errorMessage}`);
    }
  }

  /**
   * Cloudinary에서 이미지 삭제
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // URL에서 public_id 추출
      const publicId = this.extractPublicId(imageUrl);
      if (!publicId) {
        this.logger.warn('⚠️ Public ID를 추출할 수 없습니다:', imageUrl);
        return;
      }

      this.logger.log(`🗑️ 이미지 삭제 시작: ${publicId}`);
      await cloudinary.uploader.destroy(publicId);
      this.logger.log(`✅ 이미지 삭제 완료: ${publicId}`);
    } catch (error) {
      this.logger.error(`❌ 이미지 삭제 실패: ${error.message}`);
      // 삭제 실패는 치명적이지 않으므로 에러를 던지지 않음
    }
  }

  /**
   * URL에서 Cloudinary public_id 추출
   */
  private extractPublicId(url: string): string | null {
    try {
      const matches = url.match(/\/v\d+\/(.+)\.(?:jpg|jpeg|png|gif|webp)$/i);
      return matches ? matches[1] : null;
    } catch {
      return null;
    }
  }

  /**
   * 이미지 URL이 Cloudinary URL인지 확인
   */
  isCloudinaryUrl(url: string): boolean {
    return url.includes('cloudinary.com');
  }

  /**
   * 이미지 변환 URL 생성
   */
  getTransformedUrl(
    originalUrl: string,
    transformations: { width?: number; height?: number; quality?: string } = {}
  ): string {
    if (!this.isCloudinaryUrl(originalUrl)) {
      return originalUrl;
    }

    try {
      const { width = 400, height = 400, quality = 'auto:good' } = transformations;
      
      // 기존 변환 제거하고 새 변환 적용
      const baseUrl = originalUrl.split('/upload/')[0];
      const imagePath = originalUrl.split('/upload/')[1];
      
      return `${baseUrl}/upload/w_${width},h_${height},c_fill,q_${quality}/${imagePath}`;
    } catch {
      return originalUrl;
    }
  }
}
