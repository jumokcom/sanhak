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

      const result = await cloudinary.uploader.upload(
        `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
        {
          folder: `sanhak/${folder}`,
          resource_type: 'image',
          transformation: [
            { width: 800, height: 800, crop: 'limit' }, // 최대 크기 제한
            { quality: 'auto:good' }, // 자동 품질 최적화
            { format: 'auto' }, // 자동 포맷 선택
          ],
        }
      );

      this.logger.log(`✅ 이미지 업로드 성공: ${result.secure_url}`);
      return result.secure_url;
    } catch (error) {
      this.logger.error(`❌ 이미지 업로드 실패: ${error.message}`);
      throw new Error('이미지 업로드에 실패했습니다.');
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
