import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  // 사용자와의 관계
  @ManyToOne(() => User, (user) => user.portfolios)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  // 프로필 정보를 JSON으로 저장
  @Column({ type: 'jsonb', nullable: true })
  profile: {
    name: string;
    birthDate: string;
    gender: string;
    email: string;
    phone: string;
    introduction: string;
    image: string | null;
    sns: Array<{ type: string; url: string }>;
  };

  // 학력 정보를 JSON 배열로 저장
  @Column({ type: 'jsonb', nullable: true })
  educations: Array<{
    school: string;
    major: string;
    degree: string;
    startDate: string;
    endDate: string;
    isAttending: boolean;
    description: string;
  }>;

  // 경력 정보를 JSON 배열로 저장
  @Column({ type: 'jsonb', nullable: true })
  careers: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    isWorking: boolean;
    description: string;
  }>;

  // 자격증 정보를 JSON 배열로 저장
  @Column({ type: 'jsonb', nullable: true })
  certificates: Array<{
    name: string;
    issuer: string;
    date: string;
  }>;

  // 어학 능력을 JSON 배열로 저장
  @Column({ type: 'jsonb', nullable: true })
  languages: Array<{
    language: string;
    testName: string;
    score: string;
    date: string;
  }>;

  // 수상 내역을 JSON 배열로 저장
  @Column({ type: 'jsonb', nullable: true })
  awards: Array<{
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;

  // 프로젝트 정보를 JSON 배열로 저장
  @Column({ type: 'jsonb', nullable: true })
  projects: Array<{
    title: string;
    role: string;
    startDate: string;
    endDate: string;
    isOngoing: boolean;
    scope: string;
    skills: string[];
    serviceUrl: string;
    githubUrl: string;
    description: string;
  }>;

  // 자기소개를 JSON으로 저장
  @Column({ type: 'jsonb', nullable: true })
  about: {
    growth: string;
    personality: string;
    experience: string;
  };

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
