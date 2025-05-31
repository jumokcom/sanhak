import React from "react";
import styled from "styled-components";
import { ContentArea, ContentContainer, SectionTitle } from "./CommonStyles";

// 프로필 섹션 스타일 (첫 번째 섹션)
const ProfileSectionContainer = styled(ContentArea)`
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 520px;
  
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ProfileContentContainer = styled(ContentContainer)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 35px 70px rgba(0, 0, 0, 0.2),
    0 15px 35px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 45px 90px rgba(0, 0, 0, 0.25),
      0 20px 45px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

// 프로필 컨테이너
const ProfileContainer = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  justify-content: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 0;
  
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 40px;
    text-align: center;
  }
`;

// 프로필 이미지
const ProfileImage = styled.div`
  width: 280px;
  height: 350px;
  border-radius: 24px;
  background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  position: relative;
  
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 24px;
    padding: 3px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
  }
  
  &:hover {
    transform: scale(1.02) translateY(-5px);
    box-shadow: 
      0 25px 50px rgba(0, 0, 0, 0.2),
      0 10px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 1);
  }
`;

// 프로필 이미지 (실제 이미지)
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 프로필 정보
const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 600px;
  
  @media (max-width: 1024px) {
    align-items: center;
    max-width: 100%;
  }
`;

// 이름
const Name = styled.h2`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  text-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  
  @media (max-width: 768px) {
    font-size: 2.8rem;
  }
`;

// 기본 정보
const BasicInfo = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    gap: 20px;
  }
`;

// 기본 정보 항목
const InfoItem = styled.span`
  font-size: 1.4rem;
  color: #475569;
  font-weight: 600;
  padding: 8px 16px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 20px;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
  }
`;

// 한줄 자기소개
const Introduction = styled.p`
  font-size: 1.3rem;
  color: #334155;
  margin: 25px 0;
  line-height: 1.8;
  font-weight: 500;
  padding: 20px;
  background: rgba(248, 250, 252, 0.8);
  border-radius: 16px;
  border-left: 4px solid #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(248, 250, 252, 1);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  }
`;

// 연락처 정보
const ContactInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// 연락처 항목
const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  color: #475569;
  box-shadow: 
    0 4px 15px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.12),
      inset 0 1px 0 rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 1);
  }
  
  svg {
    color: #667eea;
  }
`;

// SNS 버튼 래퍼
const SnsButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 15px;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

interface SnsItem {
  type: 'github' | 'instagram';
  url: string;
}

interface ProfileSectionProps {
  profile: {
    name: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    introduction: string;
    sns: SnsItem[];
    image: string;
  };
}

// SNS 버튼
const SnsButton = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  backdrop-filter: blur(10px);
  color: #667eea;
  padding: 12px 20px;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 
    0 4px 15px rgba(102, 126, 234, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(102, 126, 234, 0.2);
  
  &:hover {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    transform: translateY(-2px);
    box-shadow: 
      0 8px 25px rgba(102, 126, 234, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }
`;

const SnsIcon = ({ type }: { type: string }) => {
  if (type === 'github') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" fill="currentColor"/>
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
    );
  }
  return null;
};

const DefaultAvatar = () => (
  <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="50" r="35" fill="#94a3b8"/>
    <path d="M20 120c0-22.091 17.909-40 40-40s40 17.909 40 40v30H20v-30z" fill="#94a3b8"/>
  </svg>
);

const ProfileSection: React.FC<ProfileSectionProps> = ({ profile }) => {
  return (
    <ProfileSectionContainer>
      <ProfileContentContainer>
        <SectionTitle>프로필</SectionTitle>
        <ProfileContainer>
          <ProfileImage>
            {profile.image ? (
              <Image src={profile.image} alt={profile.name} />
            ) : (
              <DefaultAvatar />
            )}
          </ProfileImage>
          <ProfileInfo>
            <Name>{profile.name}</Name>
            <BasicInfo>
              <InfoItem>{profile.age}세</InfoItem>
              <InfoItem>{profile.gender}</InfoItem>
            </BasicInfo>
            <Introduction>{profile.introduction}</Introduction>
            <ContactInfo>
              <ContactItem>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.email}
              </ContactItem>
              <ContactItem>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {profile.phone}
              </ContactItem>
            </ContactInfo>
            {profile.sns && profile.sns.length > 0 && (
              <SnsButtonWrapper>
                {profile.sns.map((sns, idx) => (
                  <SnsButton key={sns.type + idx} href={sns.url} target="_blank" rel="noopener noreferrer">
                    <SnsIcon type={sns.type} />
                    {sns.type === 'github' && 'GitHub'}
                    {sns.type === 'instagram' && 'Instagram'}
                  </SnsButton>
                ))}
              </SnsButtonWrapper>
            )}
          </ProfileInfo>
        </ProfileContainer>
      </ProfileContentContainer>
    </ProfileSectionContainer>
  );
};

export default ProfileSection;