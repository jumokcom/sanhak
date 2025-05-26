import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from './entities/portfolio.entity';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
  ) {}

  // 모든 포트폴리오 조회
  async findAll(): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  // 특정 사용자의 포트폴리오 조회
  async findByUserId(userId: string): Promise<Portfolio[]> {
    return this.portfolioRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  // ID로 포트폴리오 조회
  async findOne(id: number): Promise<Portfolio | null> {
    return this.portfolioRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  // 포트폴리오 생성
  async create(portfolioData: Partial<Portfolio>): Promise<Portfolio> {
    const portfolio = this.portfolioRepository.create(portfolioData);
    return this.portfolioRepository.save(portfolio);
  }

  // 포트폴리오 업데이트
  async update(id: number, portfolioData: Partial<Portfolio>): Promise<Portfolio | null> {
    await this.portfolioRepository.update(id, portfolioData);
    return this.findOne(id);
  }

  // 포트폴리오 삭제
  async remove(id: number): Promise<void> {
    await this.portfolioRepository.delete(id);
  }
}
